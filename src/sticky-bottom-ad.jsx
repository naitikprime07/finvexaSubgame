import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GAMAdUnit } from "./gam-ads";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";

export function StickyBottomAd() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [adState, setAdState] = useState('loading');
  const [isMobile, setIsMobile] = useState(false);
  const [key, setKey] = useState(0); // Force re-render on route change

  const adUnitPath = import.meta.env.VITE_AD_ANCHOR || "";
  const slotIdRef = useRef(`gam-sticky-bottom-${Date.now()}`);

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

  // Reset ad state on route change
  useEffect(() => {
    setAdState('loading');
    setIsCollapsed(false);
    setKey(prev => prev + 1); // Force new ad request
  }, [location.pathname]);

  // Handle ad state change
  const handleAdStateChange = (state) => {
    setAdState(state);
  };

  // Mobile-optimized sticky ad sizes
  const stickyAdSizes = [
    [320, 100], // Mobile banner
    [320, 50],  // Mobile small banner
    [300, 250], // Medium rectangle (fallback)
    [336, 280], // Large mobile banner
  ];

  // Don't render if not enabled, not mobile, collapsed, or ad empty/loading
  if (!live || !isMobile || isCollapsed || adState !== 'filled') {
    return null;
  }

  return (
    <div className="sticky-bottom-ad-container">
      {/* Collapse button */}
      <button
        className="sticky-ad-collapse-btn"
        onClick={() => {
          setIsCollapsed(true);
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
          key={key}
          adUnitPath={adUnitPath}
          slotId={`${slotIdRef.current}-${key}`}
          sizes={stickyAdSizes}
          onAdStateChange={handleAdStateChange}
        />
      </div>
    </div>
  );
}
