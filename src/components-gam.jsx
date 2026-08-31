import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { GAMAdUnit, GAMInterstitial } from "./gam-ads";

const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";

let adSlotCounter = 0;

// GAM Ad Slot for Home Page
export function AdSlot({ className = "", label = "Advertisement" }) {
  const [adState, setAdState] = useState('loading'); // 'loading' | 'filled' | 'empty'
  const adUnitPath = import.meta.env.VITE_AD_BANNER_HOME_TOP || "";
  const live = adsEnabled && Boolean(gamNetworkCode) && Boolean(adUnitPath);

  // Use stable slot ID with useRef
  const slotIdRef = useRef(`gam-home-top-${++adSlotCounter}`);

  // Mobile-first ad sizes (prioritize mobile banner ads)
  const adSizes = [
    [320, 100], // Mobile banner
    [320, 50],  // Mobile small banner
    [300, 250], // Mobile medium rectangle
    [336, 280], // Large mobile banner
    [728, 90],  // Desktop leaderboard
    [970, 90],  // Desktop large leaderboard
    [300, 600], // Desktop half-page
    [160, 600]  // Desktop wide skyscraper
  ];

  if (!live) return null;

  const handleAdStateChange = (state) => {
    setAdState(state);
  };

  // Always render GAMAdUnit (hidden) so it can request ads
  // Only show wrapper when ad actually fills
  if (adState !== 'filled') {
    return (
      <div style={{ display: 'none' }}>
        <GAMAdUnit
          adUnitPath={adUnitPath}
          slotId={slotIdRef.current}
          sizes={adSizes}
          onAdStateChange={handleAdStateChange}
        />
      </div>
    );
  }

  return (
    <div className={`ad-space ${className}`} aria-label={label}>
      <GAMAdUnit
        adUnitPath={adUnitPath}
        slotId={slotIdRef.current}
        sizes={adSizes}
        onAdStateChange={handleAdStateChange}
      />
    </div>
  );
}

// Interstitial Ad with custom overlay
export function InterstitialAd() {
  const { pathname, key: routeKey } = useLocation();
  const detailRoute =
    /^\/en\/(carFinance|healthFinance)\/[^/]+(?:\/index\.html)?\/?$/i.test(pathname);

  const [open, setOpen] = useState(
    () =>
      detailRoute ||
      sessionStorage.getItem("finvexo-vignette-seen-v2") !== "true"
  );

  const [adEmpty, setAdEmpty] = useState(null); // null = loading, true = empty, false = filled
  const [showOverlay, setShowOverlay] = useState(false);

  const interstitialPath = import.meta.env.VITE_AD_INTERSTITIAL || "";
  const liveAds = adsEnabled && Boolean(gamNetworkCode) && Boolean(interstitialPath);
  const mountedRoute = useRef(false);

  // Stable slot ID for interstitial
  const slotIdRef = useRef("gam-interstitial-main");

  useEffect(() => {
    if (detailRoute) setOpen(true);
    else if (mountedRoute.current) setOpen(false);
    mountedRoute.current = true;
  }, [pathname, routeKey, detailRoute]);

  // Handle ad state changes
  const handleAdStateChange = (isEmpty) => {
    setAdEmpty(isEmpty);

    if (isEmpty) {
      // Ad is empty - close overlay and mark as seen
      sessionStorage.setItem("finvexo-vignette-seen-v2", "true");
      setOpen(false);
      setShowOverlay(false);
    } else {
      // Ad loaded successfully - show overlay
      setShowOverlay(true);
    }
  };

  useEffect(() => {
    if (!open || !showOverlay) return undefined;
    document.documentElement.classList.add("interstitial-open");
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        closeAd();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.documentElement.classList.remove("interstitial-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, showOverlay]);

  const closeAd = () => {
    sessionStorage.setItem("finvexo-vignette-seen-v2", "true");
    document.documentElement.classList.remove("interstitial-open");
    setOpen(false);
    setShowOverlay(false);
  };

  // Don't render anything if not enabled
  if (!liveAds || !open) return null;

  // Render ad request in hidden container while checking if it fills
  if (!showOverlay) {
    return (
      <div style={{ display: 'none' }}>
        <GAMInterstitial
          adUnitPath={interstitialPath}
          slotId={slotIdRef.current}
          onEmptyStateChange={handleAdStateChange}
        />
      </div>
    );
  }

  // Ad loaded successfully - show overlay
  return (
    <div className="interstitial-backdrop" onClick={closeAd}>
      <div className="interstitial-ad" onClick={(e) => e.stopPropagation()}>
        <button className="interstitial-close" onClick={closeAd} aria-label="Close advertisement">
          ×
        </button>
        <div className="interstitial-label">Advertisement</div>
        <div className="interstitial-slot">
          <GAMInterstitial
            adUnitPath={interstitialPath}
            slotId={slotIdRef.current}
            onEmptyStateChange={handleAdStateChange}
          />
        </div>
      </div>
    </div>
  );
}

export function StickyVisual() {
  return (
    <aside className="sticky-visual">
      <img
        src="/home6_rev_02.ff69194.png"
        alt="Family protected by insurance"
      />
      <div>
        <b>Comprehensive coverage for life's unexpected moments.</b>
        <span>Protect What Matters Most</span>
      </div>
    </aside>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Link className="finvexo-brand" to="/" aria-label="Home">
        <img className="brand-logo-image" src="/Finvexa.png" alt="Finvexa" />
      </Link>
      <p>
        Finvexa Insights brings you quick and valuable knowledge on a variety of
        topics. Accessible anytime, anywhere — no downloads needed, just an
        internet connection and your curiosity!
      </p>
      <nav className="socials" aria-label="Social media">
        <button
          className="social-facebook"
          type="button"
          aria-label="Facebook"
          title="Facebook"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.2 8.2V6.5c0-.8.5-1 1-1h2.6V1.2L14.2 1C10.7 1 9 3.1 9 6v2.2H6v5h3V23h5.2v-9.8h3.4l.6-5h-4Z" />
          </svg>
        </button>
        <button
          className="social-instagram"
          type="button"
          aria-label="Instagram"
          title="Instagram"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle className="social-dot" cx="17.5" cy="6.7" r="1.15" />
          </svg>
        </button>
        <button
          className="social-threads"
          type="button"
          aria-label="Threads"
          title="Threads"
        >
          <svg className="threads-mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.6c5.2 0 8.3 3.5 8.3 9.4 0 5.8-3.1 9.4-8.3 9.4S3.7 17.8 3.7 12 6.8 2.6 12 2.6Z" />
            <path d="M16.8 9.7c-.5-2.4-2.1-3.7-4.7-3.7-3.1 0-5 2.3-5 6s1.9 6 5.1 6c2.9 0 5-1.7 5-4.1 0-2-1.6-3.3-4-3.3-2.2 0-3.7 1.1-3.7 2.7 0 1.5 1.2 2.4 2.9 2.4 2.6 0 4.3-2.2 4.3-5.8 0-1-.1-1.8-.3-2.6" />
          </svg>
        </button>
        <button className="social-x" type="button" aria-label="X" title="X">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 2h4.8l5.1 6.8L18.7 2H21l-7 8.5L22 22h-4.8l-5.7-7.7L5.1 22H2.8l7.6-9.3L3 2Zm4 2 11.2 16h1L8 4H7Z" />
          </svg>
        </button>
      </nav>
      <div className="footer-group">
        <h3>Information</h3>
        <Link to="/en/contact-page">Contact Us</Link>
        <Link to="/en/about-page">About Us</Link>
      </div>
      <div className="footer-group">
        <h3>Terms And Policy</h3>
        <Link to="/en/terms-of-service-page">Terms Of Service</Link>
        <Link to="/en/cookie-policy-page">Cookie Policy</Link>
        <Link to="/en/privacy-policy-page">Privacy Policy</Link>
        <Link to="/en/disclaimer-page">Disclaimer</Link>
        <Link to="/en/gdpr-page">GDPR</Link>
        <Link to="/en/faq-page">FAQ</Link>
      </div>
    </footer>
  );
}

export function Shell({ children, ad = true }) {
  return (
    <main className="site-shell">
      <section className="content-rail">
        {ad && <AdSlot className="top-ad" />}
        {children}
        <Footer />
      </section>
      <StickyVisual />
    </main>
  );
}

export function PromoCard({ children }) {
  return <div className="promo-card">{children}</div>;
}

export function AdLink({ to, children }) {
  return (
    <span className="ad-link-wrap">
      <Link className="blue-button" to={to}>
        {children}
      </Link>
      <small>Ad</small>
    </span>
  );
}
