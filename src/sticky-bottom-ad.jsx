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
      { viewport: [970, 0], sizes: [[970, 90], [728, 90]] },
      { viewport: [728, 0], sizes: [[728, 90], [320, 100], [320, 50]] },
      { viewport: [320, 0], sizes: [[320, 100], [320, 50]] },
      { viewport: [0, 0], sizes: [[300, 50]] },
    ],
    []
  );

  // A route change creates a fresh slot ID and request while preserving SPA navigation.
  useEffect(() => {
    setAdState("loading");
    setIsCollapsed(false);
  }, [location.key, location.pathname]);

  const handleAdStateChange = useCallback((state) => {
    setAdState(state);
  }, []);

  if (!live || isCollapsed) return null;

  return (
    <aside
      className={"sticky-bottom-ad-container is-" + adState}
      aria-label="Advertisement"
      aria-hidden={adState !== "filled"}
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
      <div className="sticky-ad-slot">
        <GAMAdUnit
          key={slotId}
          adUnitPath={adUnitPath}
          slotId={slotId}
          sizes={adSizes}
          sizeMapping={sizeMapping}
          onAdStateChange={handleAdStateChange}
        />
      </div>
    </aside>
  );
}