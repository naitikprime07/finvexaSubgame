import { useState, useEffect, useRef } from "react";
import { GAMAdUnit } from "./gam-ads";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";

let stickyAdCounter = 0;

export function StickyBottomAd() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adVisible, setAdVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const adUnitPath = import.meta.env.VITE_AD_ANCHOR || import.meta.env.VITE_AD_BANNER_HOME_TOP || "";
  const slotIdRef = useRef(`gam-sticky-bottom-${++stickyAdCounter}`);

  const live = adsEnabled && Boolean(gamNetworkCode) && Boolean(adUnitPath);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle ad state change
  const handleAdStateChange = (state) => {
    if (state === 'filled') {
      setAdLoaded(true);
      setAdVisible(true);
    } else {
      setAdLoaded(false);
      setAdVisible(false);
    }
  };

  // Mobile-optimized sticky ad sizes
  const stickyAdSizes = [
    [320, 100], // Mobile banner
    [320, 50],  // Mobile small banner
    [300, 250], // Medium rectangle (fallback)
    [336, 280], // Large mobile banner
  ];

  if (!live || !isMobile) return null;

  // Don't render anything if ad not loaded or user closed it
  if (!adLoaded || !adVisible || isCollapsed) return null;

  return (
    <div className="sticky-bottom-ad-container">
      {/* Collapse button */}
      <button
        className="sticky-ad-collapse-btn"
        onClick={() => {
          setIsCollapsed(true);
          setAdVisible(false);
        }}
        aria-label="Close ad"
        title="Close ad"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Ad label */}
      <div className="sticky-ad-label">Ad</div>

      {/* Ad slot */}
      <div className="sticky-ad-slot">
        <GAMAdUnit
          adUnitPath={adUnitPath}
          slotId={slotIdRef.current}
          sizes={stickyAdSizes}
          onAdStateChange={handleAdStateChange}
        />
      </div>
    </div>
  );
}
