import { useEffect, useRef, useState } from "react";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";
const debugMode = import.meta.env.VITE_ADS_DEBUG === "true";

const logAd = (...args) => {
  if (debugMode) console.log("[GAM]", ...args);
};

let gptInitialized = false;

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

// GAM Ad Unit Component with empty state handling
export function GAMAdUnit({ 
  adUnitPath, 
  slotId, 
  sizes = [[728, 90], [970, 90], [320, 50], [300, 250]] 
}) {
  const slotRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

      // Listen for slot render event to detect empty slots
      const renderListener = googletag.pubads().addEventListener('slotRenderEnded', (event) => {
        if (event.slot === slotRef.current) {
          if (event.isEmpty) {
            logAd("Ad slot empty:", slotId);
            setIsEmpty(true);
            setIsLoaded(true);
          } else {
            logAd("Ad loaded:", slotId);
            setIsEmpty(false);
            setIsLoaded(true);
          }
        }
      });

      googletag.display(slotId);
      logAd("Ad requested:", slotId);
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

  // Don't render anything if ad is empty
  if (isEmpty) return null;

  return (
    <div
      id={slotId}
      style={{
        minHeight: isLoaded ? "auto" : "90px",
        minWidth: "320px",
        textAlign: "center",
        background: isLoaded ? "transparent" : "#f9f9f9",
        margin: "10px auto",
        opacity: isLoaded ? 1 : 0.5,
        transition: "opacity 0.3s ease"
      }}
    ></div>
  );
}

// Interstitial Ad - Uses custom overlay with standard ad slot
export function GAMInterstitial({ adUnitPath, slotId, onEmptyStateChange }) {
  const slotRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || !adUnitPath) return;

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
      }

      // Define as regular display ad (not out-of-page)
      slotRef.current = googletag
        .defineSlot(adUnitPath, [[300, 250], [336, 280], [320, 480]], slotId)
        .addService(googletag.pubads());

      // Listen for slot render event
      const renderListener = googletag.pubads().addEventListener('slotRenderEnded', (event) => {
        if (event.slot === slotRef.current) {
          if (event.isEmpty) {
            logAd("Interstitial slot empty:", slotId);
            setIsEmpty(true);
            setIsLoaded(true);
            if (onEmptyStateChange) onEmptyStateChange(true);
          } else {
            logAd("Interstitial loaded:", slotId);
            setIsEmpty(false);
            setIsLoaded(true);
            if (onEmptyStateChange) onEmptyStateChange(false);
          }
        }
      });

      googletag.display(slotId);
      logAd("Interstitial requested:", slotId);
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

  // Don't render container if ad is empty
  if (isEmpty) return null;

  return (
    <div
      id={slotId}
      style={{
        minHeight: isLoaded ? "auto" : "250px",
        minWidth: "300px",
        textAlign: "center",
        margin: "0 auto",
        opacity: isLoaded ? 1 : 0.5,
        transition: "opacity 0.3s ease"
      }}
    ></div>
  );
}
