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

// GAM Ad Unit Component - Simplified like reference site
export function GAMAdUnit({
  adUnitPath,
  slotId,
  sizes = [[728, 90], [970, 90], [320, 50], [300, 250]],
  onAdStateChange
}) {
  const slotRef = useRef(null);
  const listenerRef = useRef(null);
  const containerRef = useRef(null);
  const displayedRef = useRef(false);

  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;
    const activeAdUnit = testMode ? TEST_AD_UNIT : adUnitPath;

    if (!adsEnabled || !activeNetworkCode || !activeAdUnit) {
      if (onAdStateChange) onAdStateChange('empty');
      return;
    }

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      // Clean up existing slot if any
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
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
            if (onAdStateChange) onAdStateChange('empty');
            // Hide container if ad is empty
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
          } else {
            logAd("Ad filled:", slotId, "| Size:", event.size, "| Path:", activeAdUnit);
            if (onAdStateChange) onAdStateChange('filled');
            // Show container when ad fills
            if (containerRef.current) {
              containerRef.current.style.display = 'block';
            }
          }
        }
      };

      // Add event listener
      googletag.pubads().addEventListener('slotRenderEnded', listenerRef.current);

      // Display the ad (like reference site does inline)
      if (!displayedRef.current) {
        googletag.display(slotId);
        displayedRef.current = true;
      }
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
      displayedRef.current = false;
    };
  }, [slotId, adUnitPath]);

  // Return container div - always rendered (like reference site)
  return (
    <div
      ref={containerRef}
      id={slotId}
      style={{
        minWidth: '300px',
        minHeight: '50px',
        width: '100%',
        maxWidth: '100%',
        textAlign: 'center',
        margin: '0 auto',
        overflow: 'visible',
        display: 'block' // Start visible, hide only if empty
      }}
    ></div>
  );
}

// Interstitial Ad - Uses custom overlay with standard ad slot
export function GAMInterstitial({ adUnitPath, slotId, onEmptyStateChange }) {
  const slotRef = useRef(null);
  const listenerRef = useRef(null);
  const displayedRef = useRef(false);

  useEffect(() => {
    const activeNetworkCode = testMode ? TEST_NETWORK_CODE : gamNetworkCode;
    const activeAdUnit = testMode ? TEST_AD_UNIT : adUnitPath;

    if (!adsEnabled || !activeNetworkCode || !activeAdUnit) {
      if (onEmptyStateChange) onEmptyStateChange(true);
      return;
    }

    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      // Clean up existing slot
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      }

      // Define as out-of-page interstitial (like reference site)
      slotRef.current = googletag.defineOutOfPageSlot(
        activeAdUnit,
        window.googletag.enums?.OutOfPageFormat?.INTERSTITIAL || slotId
      );

      if (slotRef.current) {
        slotRef.current.addService(googletag.pubads());

        // Create event listener
        listenerRef.current = (event) => {
          if (event.slot === slotRef.current) {
            if (event.isEmpty) {
              logAd("Interstitial empty:", slotId, "| Path:", activeAdUnit);
              if (onEmptyStateChange) onEmptyStateChange(true);
            } else {
              logAd("Interstitial filled:", slotId, "| Size:", event.size, "| Path:", activeAdUnit);
              if (onEmptyStateChange) onEmptyStateChange(false);
            }
          }
        };

        // Add event listener
        googletag.pubads().addEventListener('slotRenderEnded', listenerRef.current);

        // Display the ad
        if (!displayedRef.current) {
          googletag.display(slotRef.current);
          displayedRef.current = true;
        }
      }
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
      displayedRef.current = false;
    };
  }, []);

  return null; // Interstitial renders itself as overlay
}
