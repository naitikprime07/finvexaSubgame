import { useEffect, useRef, useState } from "react";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";
const debugMode = import.meta.env.VITE_ADS_DEBUG === "true";
const testMode = import.meta.env.VITE_ADS_TEST_MODE === "true";

const TEST_NETWORK_CODE = "6355419";
const TEST_AD_UNIT = "/6355419/Travel/Europe/France/Paris";

const logAd = (...args) => {
  if (debugMode) console.log("[GAM]", ...args);
};

let gptConfigured = false;
let displayBatchTimer;
const pendingDisplays = new Map();

function queueGPTDisplay(key, target) {
  pendingDisplays.set(key, target);
  window.clearTimeout(displayBatchTimer);
  displayBatchTimer = window.setTimeout(() => {
    const batch = [...pendingDisplays.entries()];
    pendingDisplays.clear();
    window.googletag?.cmd?.push(() => {
      batch.forEach(([, displayTarget]) => {
        googletag.display(displayTarget);
      });
    });
  }, 75);
}

function cancelQueuedDisplay(key) {
  pendingDisplays.delete(key);
}

export function GPTLoader() {
  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;
    if (!adsEnabled || !activeNetworkCode) return;

    window.googletag = window.googletag || { cmd: [] };

    let retryTimer;
    let retryCount = 0;
    const loadGPTScript = () => {
      if (window.googletag?.apiReady || document.querySelector('script[src*="gpt.js"]')) return;
      const script = document.createElement("script");
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
      script.onerror = () => {
        script.remove();
        retryCount += 1;
        logAd("Failed to load GPT script", `attempt ${retryCount}`);
        if (retryCount < 3) {
          window.clearTimeout(retryTimer);
          retryTimer = window.setTimeout(loadGPTScript, retryCount * 2500);
        }
      };
      document.head.appendChild(script);
    };
    const retryWhenOnline = () => {
      if (!window.googletag?.apiReady) loadGPTScript();
    };
    loadGPTScript();
    window.addEventListener("online", retryWhenOnline);

    // This command is queued before display-slot effects because GPTLoader is
    // mounted first in App. Services are therefore configured exactly once.
    googletag.cmd.push(() => {
      if (gptConfigured) return;
      googletag.setConfig({
        adAttributes: { page_url: window.location.href },
      });
      googletag.pubads().set("page_url", window.location.href);
      googletag.pubads().collapseEmptyDivs(true);
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
      gptConfigured = true;
      logAd("GPT ready", testMode ? "(test mode)" : "", activeNetworkCode);
    });

    return () => {
      window.removeEventListener("online", retryWhenOnline);
      window.clearTimeout(retryTimer);
    };
  }, []);

  return null;
}

export function GAMAdUnit({
  adUnitPath,
  slotId,
  sizes = [[728, 90], [970, 90], [320, 50], [300, 250]],
  sizeMapping = [],
  onAdStateChange,
}) {
  const slotRef = useRef(null);
  const listenerRef = useRef(null);
  const containerRef = useRef(null);
  const callbackRef = useRef(onAdStateChange);
  const getSizeBucket = () =>
    sizeMapping.findIndex(({ viewport }) => window.innerWidth >= viewport[0]);
  const [viewportBucket, setViewportBucket] = useState(getSizeBucket);

  useEffect(() => {
    callbackRef.current = onAdStateChange;
  }, [onAdStateChange]);

  // Re-register the slot when responsive eligibility changes. A previously
  // empty GPT slot may have collapsed its div, so refreshing that old slot is
  // not reliable when switching between desktop and mobile size buckets.
  useEffect(() => {
    if (!sizeMapping.length) return undefined;
    let resizeTimer;
    const syncViewportBucket = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setViewportBucket((current) => {
          const next = getSizeBucket();
          return next === current ? current : next;
        });
      }, 200);
    };
    syncViewportBucket();
    window.addEventListener("resize", syncViewportBucket);
    window.visualViewport?.addEventListener("resize", syncViewportBucket);
    return () => {
      window.removeEventListener("resize", syncViewportBucket);
      window.visualViewport?.removeEventListener("resize", syncViewportBucket);
      window.clearTimeout(resizeTimer);
    };
  }, [sizeMapping]);

  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;
    const activeAdUnit = testMode ? TEST_AD_UNIT : adUnitPath;
    if (!adsEnabled || !activeNetworkCode || !activeAdUnit) {
      callbackRef.current?.("empty");
      return undefined;
    }

    if (containerRef.current) containerRef.current.style.display = "block";
    callbackRef.current?.("loading");
    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      googletag.pubads().set("page_url", window.location.href);
      slotRef.current = googletag.defineSlot(activeAdUnit, sizes, slotId);

      if (!slotRef.current) {
        callbackRef.current?.("empty");
        return;
      }

      if (sizeMapping.length) {
        const mappingBuilder = googletag.sizeMapping();
        sizeMapping.forEach(({ viewport, sizes: mappedSizes }) => {
          mappingBuilder.addSize(viewport, mappedSizes);
        });
        slotRef.current.defineSizeMapping(mappingBuilder.build());
      }

      slotRef.current.addService(googletag.pubads());

      listenerRef.current = (event) => {
        if (event.slot !== slotRef.current) return;

        const nextState = event.isEmpty ? "empty" : "filled";
        logAd("Ad", nextState, slotId, event.size || "");
        callbackRef.current?.(nextState);

        if (containerRef.current) {
          containerRef.current.style.display = event.isEmpty ? "none" : "block";
        }
      };

      googletag.pubads().addEventListener(
        "slotRenderEnded",
        listenerRef.current
      );
      queueGPTDisplay(`static:${slotId}`, slotId);
    });

    return () => {
      cancelQueuedDisplay(`static:${slotId}`);
      window.googletag?.cmd?.push(() => {
        if (listenerRef.current) {
          googletag.pubads().removeEventListener(
            "slotRenderEnded",
            listenerRef.current
          );
          listenerRef.current = null;
        }
        if (slotRef.current) {
          googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }
      });
    };
  }, [slotId, adUnitPath, sizes, sizeMapping, viewportBucket]);

  return (
    <div
      ref={containerRef}
      id={slotId}
      style={{
        minWidth: 0,
        minHeight: 0,
        width: "100%",
        maxWidth: "100%",
        textAlign: "center",
        margin: "0 auto",
        overflow: "visible",
        display: "block",
      }}
    />
  );
}

export function GAMInterstitial({ adUnitPath, slotId, onEmptyStateChange }) {
  const slotRef = useRef(null);
  const listenerRef = useRef(null);
  const callbackRef = useRef(onEmptyStateChange);

  useEffect(() => {
    callbackRef.current = onEmptyStateChange;
  }, [onEmptyStateChange]);

  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;
    const activeAdUnit = testMode ? TEST_AD_UNIT : adUnitPath;

    if (!adsEnabled || !activeNetworkCode || !activeAdUnit) {
      callbackRef.current?.(true);
      return undefined;
    }

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      slotRef.current = googletag.defineOutOfPageSlot(
        activeAdUnit,
        googletag.enums?.OutOfPageFormat?.INTERSTITIAL
      );

      if (!slotRef.current) {
        callbackRef.current?.(true);
        return;
      }

      slotRef.current.addService(googletag.pubads());
      listenerRef.current = (event) => {
        if (event.slot !== slotRef.current) return;
        logAd("Interstitial", event.isEmpty ? "empty" : "filled", slotId);
        callbackRef.current?.(event.isEmpty);
      };
      googletag.pubads().addEventListener(
        "slotRenderEnded",
        listenerRef.current
      );
      queueGPTDisplay(`interstitial:${slotId}`, slotRef.current);
    });

    return () => {
      cancelQueuedDisplay(`interstitial:${slotId}`);
      window.googletag?.cmd?.push(() => {
        if (listenerRef.current) {
          googletag.pubads().removeEventListener(
            "slotRenderEnded",
            listenerRef.current
          );
          listenerRef.current = null;
        }
        if (slotRef.current) {
          googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }
      });
    };
  }, [adUnitPath, slotId]);

  return null;
}
export function GAMRewarded({ adUnitPath, onReady, onStateChange }) {
  const slotRef = useRef(null);
  const listenersRef = useRef([]);
  const readyRef = useRef(onReady);
  const stateRef = useRef(onStateChange);

  useEffect(() => { readyRef.current = onReady; }, [onReady]);
  useEffect(() => { stateRef.current = onStateChange; }, [onStateChange]);

  useEffect(() => {
    const activeNetworkCode = gamNetworkCode;
    const activeAdUnit = adUnitPath;

    if (!adsEnabled || !activeNetworkCode || !activeAdUnit) {
      stateRef.current?.("empty");
      return undefined;
    }

    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(() => {
      const rewardedFormat = googletag.enums?.OutOfPageFormat?.REWARDED;
      if (!rewardedFormat) {
        stateRef.current?.("unsupported");
        return;
      }

      slotRef.current = googletag.defineOutOfPageSlot(activeAdUnit, rewardedFormat);
      if (!slotRef.current) {
        stateRef.current?.("unsupported");
        return;
      }

      slotRef.current.addService(googletag.pubads());
      const listen = (name, handler) => {
        googletag.pubads().addEventListener(name, handler);
        listenersRef.current.push([name, handler]);
      };

      listen("slotRenderEnded", (event) => {
        if (event.slot !== slotRef.current) return;
        if (event.isEmpty) stateRef.current?.("empty");
      });
      listen("rewardedSlotReady", (event) => {
        if (event.slot !== slotRef.current) return;
        stateRef.current?.("ready");
        readyRef.current?.(() => event.makeRewardedVisible());
      });
      listen("rewardedSlotGranted", (event) => {
        if (event.slot !== slotRef.current) return;
        stateRef.current?.("granted");
      });
      listen("rewardedSlotClosed", (event) => {
        if (event.slot !== slotRef.current) return;
        stateRef.current?.("closed");
      });

      queueGPTDisplay(`rewarded:${activeAdUnit}`, slotRef.current);
    });

    return () => {
      cancelQueuedDisplay(`rewarded:${activeAdUnit}`);
      window.googletag?.cmd?.push(() => {
        listenersRef.current.forEach(([name, handler]) => {
          googletag.pubads().removeEventListener(name, handler);
        });
        listenersRef.current = [];
        if (slotRef.current) {
          googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }
      });
    };
  }, [adUnitPath]);

  return null;
}
