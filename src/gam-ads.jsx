import { useEffect, useRef } from "react";

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

export function GPTLoader() {
  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;
    if (!adsEnabled || !activeNetworkCode) return;

    window.googletag = window.googletag || { cmd: [] };

    if (!document.querySelector('script[src*="gpt.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
      script.onerror = () => logAd("Failed to load GPT script");
      document.head.appendChild(script);
    }

    // This command is queued before display-slot effects because GPTLoader is
    // mounted first in App. Services are therefore configured exactly once.
    googletag.cmd.push(() => {
      if (gptConfigured) return;
      googletag.setConfig({
        adAttributes: { page_url: window.location.href },
      });
      googletag.pubads().set("page_url", window.location.href);
      googletag.pubads().collapseEmptyDivs(true);
      googletag.enableServices();
      gptConfigured = true;
      logAd("GPT ready", testMode ? "(test mode)" : "", activeNetworkCode);
    });
  }, []);

  return null;
}

export function GAMAdUnit({
  adUnitPath,
  slotId,
  sizes = [[728, 90], [970, 90], [320, 50], [300, 250]],
  sizeMapping = [],
  onAdStateChange,
  fallbackAdUnitPath = "",
}) {
  const slotRef = useRef(null);
  const listenerRef = useRef(null);
  const containerRef = useRef(null);
  const callbackRef = useRef(onAdStateChange);

  useEffect(() => {
    callbackRef.current = onAdStateChange;
  }, [onAdStateChange]);

  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;
    const activeAdUnit = testMode ? TEST_AD_UNIT : adUnitPath;
    const activeFallbackUnit = testMode ? "" : fallbackAdUnitPath;
    let resizeTimer;
    let fallbackTimer;
    let activeSizeBucket = -1;
    let disposed = false;

    if (!adsEnabled || !activeNetworkCode || !activeAdUnit) {
      callbackRef.current?.("empty");
      return undefined;
    }

    const getSizeBucket = () =>
      sizeMapping.findIndex(({ viewport }) => window.innerWidth >= viewport[0]);

    const refreshForViewport = () => {
      const nextSizeBucket = getSizeBucket();
      if (nextSizeBucket === activeSizeBucket) return;
      activeSizeBucket = nextSizeBucket;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        window.googletag?.cmd?.push(() => {
          if (!slotRef.current) return;
          if (containerRef.current) containerRef.current.style.display = "block";
          callbackRef.current?.("loading");
          googletag.pubads().refresh([slotRef.current]);
        });
      }, 200);
    };

    const removeCurrentSlot = () => {
      if (listenerRef.current) {
        googletag.pubads().removeEventListener("slotRenderEnded", listenerRef.current);
        listenerRef.current = null;
      }
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      }
    };

    const defineAndDisplay = (unitPath, isFallback = false) => {
      if (disposed) return;
      const slot = googletag.defineSlot(unitPath, sizes, slotId);
      slotRef.current = slot;
      if (!slot) {
        callbackRef.current?.("empty");
        return;
      }

      if (sizeMapping.length) {
        const mappingBuilder = googletag.sizeMapping();
        sizeMapping.forEach(({ viewport, sizes: mappedSizes }) => {
          mappingBuilder.addSize(viewport, mappedSizes);
        });
        slot.defineSizeMapping(mappingBuilder.build());
      }
      slot.addService(googletag.pubads());

      const listener = (event) => {
        if (event.slot !== slot) return;

        if (
          event.isEmpty &&
          !isFallback &&
          activeFallbackUnit &&
          activeFallbackUnit !== unitPath
        ) {
          logAd("Ad empty; retrying fallback", slotId, activeFallbackUnit);
          removeCurrentSlot();
          if (containerRef.current) {
            containerRef.current.replaceChildren();
            containerRef.current.style.display = "block";
          }
          callbackRef.current?.("loading");
          fallbackTimer = window.setTimeout(() => {
            window.googletag?.cmd?.push(() => defineAndDisplay(activeFallbackUnit, true));
          }, 0);
          return;
        }

        const nextState = event.isEmpty ? "empty" : "filled";
        logAd("Ad", nextState, slotId, event.size || "");
        callbackRef.current?.(nextState);
        if (containerRef.current) {
          containerRef.current.style.display = event.isEmpty ? "none" : "block";
        }
      };

      listenerRef.current = listener;
      googletag.pubads().addEventListener("slotRenderEnded", listener);
      googletag.display(slotId);
    };

    window.googletag = window.googletag || { cmd: [] };
    activeSizeBucket = getSizeBucket();
    if (sizeMapping.length) window.addEventListener("resize", refreshForViewport);
    googletag.cmd.push(() => defineAndDisplay(activeAdUnit));

    return () => {
      disposed = true;
      window.removeEventListener("resize", refreshForViewport);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(fallbackTimer);
      window.googletag?.cmd?.push(removeCurrentSlot);
    };
  }, [slotId, adUnitPath, fallbackAdUnitPath, sizes, sizeMapping]);

  return (
    <div
      ref={containerRef}
      id={slotId}
      style={{
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        width: "100%",
        maxWidth: "100%",
        textAlign: "center",
        margin: "0 auto",
        overflow: "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
      googletag.display(slotRef.current);
    });

    return () => {
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

      googletag.display(slotRef.current);
    });

    return () => {
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
