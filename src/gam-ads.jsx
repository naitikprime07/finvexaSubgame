import { useEffect, useRef } from "react";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";
const debugMode = import.meta.env.VITE_ADS_DEBUG === "true";

const logAd = (...args) => {
  if (debugMode) console.log("[GAM]", ...args);
};

// Global state - GPT should only be loaded once per page (SPA best practice)
let gptLoaded = false;
let gptReady = false;
let interstitialSlot = null;

/**
 * GPTLoader - Loads Google Publisher Tag library once per session
 * Based on: https://developers.google.com/publisher-tag/samples/integrations/react
 */
export function GPTLoader() {
  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || gptLoaded) return;

    gptLoaded = true;
    window.googletag = window.googletag || { cmd: [] };

    // Check if script already exists
    if (document.querySelector('script[src*="gpt.js"]')) {
      logAd("GPT script already loaded");
      gptReady = true;
      return;
    }

    // Create and load GPT script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

    script.onload = () => {
      googletag.cmd.push(() => {
        // Use new setConfig API instead of deprecated collapseEmptyDivs()
        // BEFORE_FETCH: collapse slots by default, expand only if filled
        googletag.setConfig({
          collapseDiv: "BEFORE_FETCH"
        });

        // Enable services once
        googletag.enableServices();
        gptReady = true;
        logAd("GPT initialized and services enabled");
      });
    };

    script.onerror = () => {
      logAd("Error loading GPT script");
      gptLoaded = false;
    };

    document.head.appendChild(script);
  }, []); // Empty deps - run once

  return null;
}

/**
 * GAMAdUnit - Standard display ad component
 * Properly manages slot lifecycle with React
 */
export function GAMAdUnit({ 
  adUnitPath, 
  slotId, 
  sizes = [[728, 90], [970, 90], [320, 50], [300, 250]] 
}) {
  const slotRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || !adUnitPath) return;

    window.googletag = window.googletag || { cmd: [] };

    let mounted = true;

    googletag.cmd.push(() => {
      if (!mounted) return;

      // Clean up existing slot if any
      if (slotRef.current) {
        googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      }

      // Define new slot
      const slot = googletag.defineSlot(adUnitPath, sizes, slotId);
      
      if (slot) {
        slot.addService(googletag.pubads());
        slotRef.current = slot;

        // Display ad
        googletag.display(slotId);
        logAd("Ad displayed:", slotId, adUnitPath);
      } else {
        logAd("Failed to define slot:", slotId);
      }
    });

    // Cleanup on unmount - React best practice
    return () => {
      mounted = false;
      if (slotRef.current) {
        googletag.cmd.push(() => {
          if (slotRef.current) {
            googletag.destroySlots([slotRef.current]);
            logAd("Slot destroyed:", slotId);
            slotRef.current = null;
          }
        });
      }
    };
  }, []); // Empty deps - slot should persist for component lifetime

  if (!adsEnabled || !adUnitPath) return null;

  return (
    <div
      ref={containerRef}
      id={slotId}
      style={{
        minHeight: "90px",
        minWidth: "320px",
        textAlign: "center",
        margin: "10px auto"
      }}
    />
  );
}

/**
 * GAMInterstitial - Out-of-page interstitial ad
 * Based on: https://developers.google.com/publisher-tag/samples/display-web-interstitial-ad
 * 
 * Key points:
 * - Returns null if page/device doesn't support interstitials
 * - Should be defined in <head> or early in page load
 * - Only one interstitial per page session
 * - No <div> required (GPT creates its own overlay)
 */
export function GAMInterstitial({ adUnitPath }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!adsEnabled || !gamNetworkCode || !adUnitPath) return;
    if (initialized.current || interstitialSlot) return;

    initialized.current = true;
    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(() => {
      // Define out-of-page slot for interstitial
      // Returns null if not supported
      const slot = googletag.defineOutOfPageSlot(
        adUnitPath,
        googletag.enums.OutOfPageFormat.INTERSTITIAL
      );

      if (slot) {
        slot.addService(googletag.pubads());
        interstitialSlot = slot;
        logAd("Interstitial slot defined:", adUnitPath);
        
        // Display immediately after definition
        googletag.display(slot);
        logAd("Interstitial displayed");
      } else {
        logAd("Interstitial not supported on this page/device");
      }
    });

    // Don't destroy interstitial - it should persist for the session
    return () => {
      initialized.current = false;
    };
  }, []); // Empty deps - run once

  if (!adsEnabled || !adUnitPath) return null;

  // Interstitials don't need a visible container div
  return null;
}
