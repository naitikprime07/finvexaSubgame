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
        // Collapse empty divs immediately (before ad request)
        googletag.pubads().collapseEmptyDivs(true);
        googletag.enableServices();
        logAd("GPT ready");
      });
    };

    document.head.appendChild(script);
  }, []);

  return null;
}

// GAM Ad Unit Component with proper empty state handling
export function GAMAdUnit({
  adUnitPath,
  slotId,
  sizes = [[728, 90], [970, 90], [320, 50], [300, 250]],
  onAdStateChange
}) {
  const slotRef = useRef(null);
  const [adState, setAdState] = useState('loading'); // 'loading' | 'filled' | 'empty'

  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || !adUnitPath) {
      setAdState('empty');
      if (onAdStateChange) onAdStateChange('empty');
      return;
    }

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
      }

      slotRef.current = googletag
        .defineSlot(adUnitPath, sizes, slotId)
        .addService(googletag.pubads());

      // Listen for slot render event BEFORE displaying
      googletag.pubads().addEventListener('slotRenderEnded', (event) => {
        if (event.slot === slotRef.current) {
          if (event.isEmpty) {
            logAd("Ad empty:", slotId);
            setAdState('empty');
            if (onAdStateChange) onAdStateChange('empty');
          } else {
            logAd("Ad filled:", slotId);
            setAdState('filled');
            if (onAdStateChange) onAdStateChange('filled');
          }
        }
      });

      googletag.display(slotId);
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

  // Don't render anything if not enabled or empty
  if (!adsEnabled || !adUnitPath || adState === 'empty') {
    return null;
  }

  return (
    <div
      id={slotId}
      style={{
        display: adState === 'filled' ? 'block' : 'none',
        minHeight: 'auto',
        minWidth: 'auto',
        textAlign: 'center',
        margin: '10px auto',
        overflow: 'hidden'
      }}
    ></div>
  );
}

// Interstitial Ad - Uses custom overlay with standard ad slot
export function GAMInterstitial({ adUnitPath, slotId, onEmptyStateChange }) {
  const slotRef = useRef(null);
  const [adState, setAdState] = useState('loading'); // 'loading' | 'filled' | 'empty'

  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || !adUnitPath) {
      setAdState('empty');
      if (onEmptyStateChange) onEmptyStateChange(true);
      return;
    }

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
      }

      // Define as regular display ad
      slotRef.current = googletag
        .defineSlot(adUnitPath, [[300, 250], [336, 280], [320, 480]], slotId)
        .addService(googletag.pubads());

      // Listen for slot render event
      googletag.pubads().addEventListener('slotRenderEnded', (event) => {
        if (event.slot === slotRef.current) {
          if (event.isEmpty) {
            logAd("Interstitial empty:", slotId);
            setAdState('empty');
            if (onEmptyStateChange) onEmptyStateChange(true);
          } else {
            logAd("Interstitial filled:", slotId);
            setAdState('filled');
            if (onEmptyStateChange) onEmptyStateChange(false);
          }
        }
      });

      googletag.display(slotId);
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

  if (!adsEnabled || !adUnitPath || adState === 'empty') {
    return null;
  }

  return (
    <div
      id={slotId}
      style={{
        display: adState === 'filled' ? 'block' : 'none',
        minHeight: 'auto',
        minWidth: 'auto',
        textAlign: 'center',
        margin: '0 auto',
        overflow: 'hidden'
      }}
    ></div>
  );
}
