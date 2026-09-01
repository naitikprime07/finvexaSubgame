import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { GAMAdUnit } from "./gam-ads";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";

export function StickyBottomAd() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [adState, setAdState] = useState("loading");

  // This is the dedicated GAM unit for the bottom mobile anchor.
  const adUnitPath = import.meta.env.VITE_AD_ANCHOR || "";
  const mobileFallbackPath = import.meta.env.VITE_AD_BANNER_CATALOG_TOP || "";
  const [useMobileFallback, setUseMobileFallback] = useState(false);
  const requestedAdUnitPath = useMobileFallback ? mobileFallbackPath : adUnitPath;
  const slotPrefixRef = useRef("gam-mobile-anchor");
  const routeKey = location.key || location.pathname;
  const safeRouteKey = routeKey.replace(/[^a-zA-Z0-9_-]/g, "-");
  const slotId = slotPrefixRef.current + "-" + safeRouteKey;

  const live = adsEnabled && Boolean(gamNetworkCode) && Boolean(adUnitPath);

  const adSizes = useMemo(
    () => [[970, 90], [728, 90], [320, 100], [320, 50], [300, 50]],
    []
  );
  const sizeMapping = useMemo(
    () => [
      { viewport: [994, 0], sizes: [[970, 90], [728, 90]] },
      { viewport: [744, 0], sizes: [[728, 90], [320, 100], [320, 50]] },
      { viewport: [336, 0], sizes: [[320, 100], [320, 50]] },
      { viewport: [0, 0], sizes: [[300, 50]] },
    ],
    []
  );

  // A route change creates a fresh slot ID and request while preserving SPA navigation.
  useEffect(() => {
    setAdState("loading");
    setIsCollapsed(false);
    setUseMobileFallback(false);
  }, [location.key, location.pathname]);

  const handleAdStateChange = useCallback((state) => {
    setAdState(state);
    const mobileWidth = window.visualViewport?.width || window.innerWidth;
    if (
      state === "empty" &&
      mobileWidth <= 768 &&
      !useMobileFallback &&
      mobileFallbackPath &&
      mobileFallbackPath !== adUnitPath
    ) {
      setUseMobileFallback(true);
    }
  }, [adUnitPath, mobileFallbackPath, useMobileFallback]);

  if (!live) return null;

  return (
    <aside
      className={`sticky-bottom-ad-container is-${isCollapsed ? "collapsed" : adState}`}
      aria-label="Advertisement"
    >
      <button
        className="sticky-ad-collapse-btn"
        type="button"
        onClick={() => setIsCollapsed(true)}
        aria-label="Close advertisement"
        title="Close advertisement"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="sticky-ad-label">Advertisement</div>
      {!isCollapsed && <div className="sticky-ad-slot">
        <GAMAdUnit
          key={slotId}
          adUnitPath={requestedAdUnitPath}
          slotId={slotId}
          sizes={adSizes}
          sizeMapping={sizeMapping}
          onAdStateChange={handleAdStateChange}
        />
      </div>}
    </aside>
  );
}