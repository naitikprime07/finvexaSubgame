import { useEffect, useRef } from "react";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";
const debugMode = import.meta.env.VITE_ADS_DEBUG === "true";

const logAd = (...args) => {
  if (debugMode) console.log("[GAM]", ...args);
};

// Load Google Publisher Tag (GPT)
export function GPTLoader() {
  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode) {
      logAd("Ads disabled or no network code");
      return;
    }

    window.googletag = window.googletag || { cmd: [] };

    if (document.querySelector('script[src*="gpt.js"]')) {
      logAd("GPT already loaded");
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

    script.onload = () => {
      logAd("GPT loaded");
      googletag.cmd.push(() => {
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
        logAd("GPT services enabled");
      });
    };

    document.head.appendChild(script);
  }, []);

  return null;
}

// GAM Ad Unit Component
export function GAMAdUnit({ adUnitPath, slotId, sizes = [[728, 90], [970, 90], [320, 50], [300, 250]] }) {
  const slotRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || !adUnitPath || initialized.current) {
      return;
    }

    initialized.current = true;

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      try {
        slotRef.current = googletag
          .defineSlot(adUnitPath, sizes, slotId)
          .addService(googletag.pubads());

        googletag.display(slotId);
        googletag.pubads().refresh([slotRef.current]);

        logAd("Ad loaded:", slotId, adUnitPath);
      } catch (e) {
        console.error("[GAM] Error:", e);
      }
    });

    return () => {
      if (slotRef.current) {
        googletag.cmd.push(() => {
          googletag.destroySlots([slotRef.current]);
          logAd("Ad destroyed:", slotId);
        });
      }
    };
  }, [adUnitPath, slotId]);

  if (!adsEnabled || !adUnitPath) return null;

  return <div id={slotId} style={{ minHeight: "90px", textAlign: "center" }}></div>;
}

// Interstitial Ad (Out-of-Page)
export function GAMInterstitial({ adUnitPath, slotId }) {
  const slotRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || !adUnitPath || initialized.current) {
      return;
    }

    initialized.current = true;

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      try {
        slotRef.current = googletag
          .defineOutOfPageSlot(adUnitPath, googletag.enums.OutOfPageFormat.INTERSTITIAL)
          .addService(googletag.pubads());

        if (slotRef.current) {
          slotRef.current.addService(googletag.pubads());
          googletag.display(slotId);
          logAd("Interstitial loaded:", slotId);
        }
      } catch (e) {
        console.error("[GAM] Interstitial error:", e);
      }
    });

    return () => {
      if (slotRef.current) {
        googletag.cmd.push(() => {
          googletag.destroySlots([slotRef.current]);
        });
      }
    };
  }, [adUnitPath, slotId]);

  if (!adsEnabled || !adUnitPath) return null;

  return <div id={slotId}></div>;
}
