import { useEffect, useRef, useState } from "react";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";
const debugMode = import.meta.env.VITE_ADS_DEBUG === "true";
const testMode = import.meta.env.VITE_ADS_TEST_MODE === "true";

// Google's test ad network (always fills - for testing implementation only)
const TEST_NETWORK_CODE = "6355419";
const TEST_AD_UNIT = "/6355419/Travel/Europe/France/Paris";

const logAd = (...args) => {
  if (debugMode) console.log("[GAM]", ...args);
};

let gptInitialized = false;

// Load Google Publisher Tag (GPT)
export function GPTLoader() {
  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;

    if (!adsEnabled || !activeNetworkCode || gptInitialized) return;

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
        // Use new API instead of deprecated collapseEmptyDivs
        googletag.pubads().set('page_url', window.location.href);
        googletag.enableServices();
        if (testMode) {
          logAd("⚠️ GPT ready - TEST MODE - Network:", activeNetworkCode, "| Test ads will always fill");
        } else {
          logAd("GPT ready - Network:", activeNetworkCode);
        }
      });
    };

    script.onerror = () => {
      logAd("Failed to load GPT script");
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
  const listenerRef = useRef(null);
  const [adState, setAdState] = useState('loading'); // 'loading' | 'filled' | 'empty'

  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;
    const activeAdUnit = testMode ? TEST_AD_UNIT : adUnitPath;

    if (!adsEnabled || !activeNetworkCode || !activeAdUnit) {
      setAdState('empty');
      if (onAdStateChange) onAdStateChange('empty');
      return;
    }

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      // Clean up existing slot if any
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
      }

      // Define new slot
      slotRef.current = googletag
        .defineSlot(activeAdUnit, sizes, slotId)
        .addService(googletag.pubads());

      // Create event listener function
      listenerRef.current = (event) => {
        if (event.slot === slotRef.current) {
          if (event.isEmpty) {
            logAd("Ad empty:", slotId, "| Path:", activeAdUnit);
            setAdState('empty');
            if (onAdStateChange) onAdStateChange('empty');
          } else {
            logAd("Ad filled:", slotId, "| Size:", event.size, "| Path:", activeAdUnit);
            setAdState('filled');
            if (onAdStateChange) onAdStateChange('filled');
          }
        }
      };

      // Add event listener
      googletag.pubads().addEventListener('slotRenderEnded', listenerRef.current);

      // Display the ad
      googletag.display(slotId);
    });

    return () => {
      googletag.cmd.push(() => {
        // Remove event listener
        if (listenerRef.current) {
          googletag.pubads().removeEventListener('slotRenderEnded', listenerRef.current);
          listenerRef.current = null;
        }
        // Destroy slot
        if (slotRef.current) {
          googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }
      });
    };
  }, []);

  // Return container div that GPT needs
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
  const listenerRef = useRef(null);
  const [adState, setAdState] = useState('loading'); // 'loading' | 'filled' | 'empty'

  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;
    const activeAdUnit = testMode ? TEST_AD_UNIT : adUnitPath;

    if (!adsEnabled || !activeNetworkCode || !activeAdUnit) {
      setAdState('empty');
      if (onEmptyStateChange) onEmptyStateChange(true);
      return;
    }

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      // Clean up existing slot
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
      }

      // Define as regular display ad with mobile-first sizes
      const interstitialSizes = [
        [300, 250], // Mobile medium rectangle
        [336, 280], // Large mobile banner
        [320, 480], // Mobile interstitial
        [300, 600], // Half-page
        [320, 100], // Mobile banner
        [320, 50]   // Mobile small banner
      ];

      slotRef.current = googletag
        .defineSlot(activeAdUnit, interstitialSizes, slotId)
        .addService(googletag.pubads());

      // Create event listener
      listenerRef.current = (event) => {
        if (event.slot === slotRef.current) {
          if (event.isEmpty) {
            logAd("Interstitial empty:", slotId, "| Path:", activeAdUnit);
            setAdState('empty');
            if (onEmptyStateChange) onEmptyStateChange(true);
          } else {
            logAd("Interstitial filled:", slotId, "| Size:", event.size, "| Path:", activeAdUnit);
            setAdState('filled');
            if (onEmptyStateChange) onEmptyStateChange(false);
          }
        }
      };

      // Add event listener
      googletag.pubads().addEventListener('slotRenderEnded', listenerRef.current);

      // Display the ad
      googletag.display(slotId);
    });

    return () => {
      googletag.cmd.push(() => {
        // Remove event listener
        if (listenerRef.current) {
          googletag.pubads().removeEventListener('slotRenderEnded', listenerRef.current);
          listenerRef.current = null;
        }
        // Destroy slot
        if (slotRef.current) {
          googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }
      });
    };
  }, []);

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
