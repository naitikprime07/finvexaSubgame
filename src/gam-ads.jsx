import { useEffect, useRef } from "react";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";
const debugMode = import.meta.env.VITE_ADS_DEBUG === "true";

const logAd = (...args) => {
  if (debugMode) console.log("[GAM]", ...args);
};

let gptInitialized = false;
let interstitialSlot = null;

// Load Google Publisher Tag (GPT)
export function GPTLoader() {
  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || gptInitialized) return;

    gptInitialized = true;
    window.googletag = window.googletag || { cmd: [] };

    if (document.querySelector('script[src*="gpt.js"]')) {
      logAd("GPT already loaded");
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

    script.onload = () => {
      googletag.cmd.push(() => {
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
        logAd("GPT ready");
      });
    };

    document.head.appendChild(script);
  }, []);

  return null;
}

// GAM Ad Unit Component
export function GAMAdUnit({ adUnitPath, slotId, sizes = [[728, 90], [970, 90], [320, 50], [300, 250]] }) {
  const slotRef = useRef(null);

  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || !adUnitPath) return;

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
      }

      slotRef.current = googletag
        .defineSlot(adUnitPath, sizes, slotId)
        .addService(googletag.pubads());

      googletag.display(slotId);
      logAd("Ad shown:", slotId);
    });

    return () => {
      if (slotRef.current) {
        googletag.cmd.push(() => {
          googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        });
      }
    };
  }, []);

  if (!adsEnabled || !adUnitPath) return null;

  return (
    <div
      id={slotId}
      style={{
        minHeight: "90px",
        minWidth: "320px",
        textAlign: "center",
        background: "#f9f9f9",
        margin: "10px auto"
      }}
    ></div>
  );
}

// Interstitial Ad (Out-of-Page)
export function GAMInterstitial({ adUnitPath, slotId = "gam-interstitial" }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || !adUnitPath || initialized.current) return;

    initialized.current = true;
    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      // Only create one interstitial slot per page
      if (!interstitialSlot) {
        interstitialSlot = googletag.defineOutOfPageSlot(
          adUnitPath,
          googletag.enums.OutOfPageFormat.INTERSTITIAL
        );

        if (interstitialSlot) {
          interstitialSlot.addService(googletag.pubads());
          logAd("Interstitial defined:", slotId);
        }
      }

      // Display the interstitial
      if (interstitialSlot) {
        googletag.display(slotId);
        logAd("Interstitial shown:", slotId);
      }
    });

    return () => {
      // Don't destroy interstitial on unmount - keep it for the session
      initialized.current = false;
    };
  }, []);

  if (!adsEnabled || !adUnitPath) return null;

  return <div id={slotId} style={{ display: "none" }}></div>;
}
