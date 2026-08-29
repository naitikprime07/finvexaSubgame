import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT || "";

export function AdSenseLoader() {
  useEffect(() => {
    if (!adsEnabled || !adsenseClient || document.querySelector("script[data-finvexo-adsense]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClient)}`;
    script.dataset.finvexoAdsense = "true";
    document.head.appendChild(script);
  }, []);
  return null;
}

export function AdSenseUnit({ slot, className = "" }) {
  const pushed = useRef(false);
  const live = adsEnabled && Boolean(adsenseClient) && Boolean(slot);
  useEffect(() => {
    if (!live || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.warn("AdSense unit initialization was deferred.", error);
    }
  }, [live]);
  if (!live) return null;
  return <ins className={`adsbygoogle ${className}`} style={{ display: "block", width: "100%" }} data-ad-client={adsenseClient} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />;
}

export function TestAd({ variant = "banner" }) {
  return (
    <div className={`test-ad test-ad-${variant}`}>
      <small>TEST ADVERTISEMENT</small>
      <span className="test-ad-mark">P</span>
      <div><strong>Finvexo Play</strong><p>Discover quick browser games for every break.</p></div>
      <b>OPEN</b>
    </div>
  );
}
export function AdSlot({ className = "", label = "Advertisement" }) {
  const slot = import.meta.env.VITE_ADSENSE_MAIN_TOP_SLOT || "";
  const live = adsEnabled && Boolean(adsenseClient) && Boolean(slot);
  return (
    <div className={`ad-space ${className}`} aria-label={label}>
      {live ? <AdSenseUnit slot={slot} /> : <TestAd variant="vertical" />}
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
        <img className="brand-logo-image" src="/Finvexo.png" alt="Finvexo" />
      </Link>
      <p>
        Finvexo Insights brings you quick and valuable knowledge on a variety
        of topics. Accessible anytime, anywhere — no downloads needed, just an
        internet connection and your curiosity!
      </p>
      <nav className="socials" aria-label="Social media">
        <button className="social-facebook" type="button" aria-label="Facebook" title="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.2V6.5c0-.8.5-1 1-1h2.6V1.2L14.2 1C10.7 1 9 3.1 9 6v2.2H6v5h3V23h5.2v-9.8h3.4l.6-5h-4Z" /></svg>
        </button>
        <button className="social-instagram" type="button" aria-label="Instagram" title="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle className="social-dot" cx="17.5" cy="6.7" r="1.15" /></svg>
        </button>
        <button className="social-threads" type="button" aria-label="Threads" title="Threads">
          <svg className="threads-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6c5.2 0 8.3 3.5 8.3 9.4 0 5.8-3.1 9.4-8.3 9.4S3.7 17.8 3.7 12 6.8 2.6 12 2.6Z" /><path d="M16.8 9.7c-.5-2.4-2.1-3.7-4.7-3.7-3.1 0-5 2.3-5 6s1.9 6 5.1 6c2.9 0 5-1.7 5-4.1 0-2-1.6-3.3-4-3.3-2.2 0-3.7 1.1-3.7 2.7 0 1.5 1.2 2.4 2.9 2.4 2.6 0 4.3-2.2 4.3-5.8 0-1-.1-1.8-.3-2.6" /></svg>
        </button>
        <button className="social-x" type="button" aria-label="X" title="X">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2h4.8l5.1 6.8L18.7 2H21l-7 8.5L22 22h-4.8l-5.7-7.7L5.1 22H2.8l7.6-9.3L3 2Zm4 2 11.2 16h1L8 4H7Z" /></svg>
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




export function InterstitialAd() {
  const { pathname, key: routeKey } = useLocation();
  const detailRoute = /^\/en\/(carFinance|healthFinance)\/[^/]+(?:\/index\.html)?\/?$/i.test(pathname);
  const [open, setOpen] = useState(() => detailRoute || sessionStorage.getItem("finvexo-vignette-seen-v2") !== "true");
  const liveAds = adsEnabled && Boolean(adsenseClient);
  const mountedRoute = useRef(false);

  useEffect(() => {
    if (detailRoute) setOpen(true);
    else if (mountedRoute.current) setOpen(false);
    mountedRoute.current = true;
  }, [pathname, routeKey, detailRoute]);

  useEffect(() => {
    if (!open) return undefined;
    document.documentElement.classList.add("interstitial-open");
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.documentElement.classList.remove("interstitial-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const closeAd = () => {
    sessionStorage.setItem("finvexo-vignette-seen-v2", "true");
    document.documentElement.classList.remove("interstitial-open");
    setOpen(false);
  };

  if (!open || (liveAds && !detailRoute)) return null;
  return (
    <div className="interstitial-backdrop" role="presentation" data-trigger={detailRoute ? "detail-page" : "session-landing"}>
      <section className="interstitial-ad" role="dialog" aria-modal="true" aria-label="Advertisement">
        <button className="interstitial-close" type="button" onClick={closeAd} aria-label="Close advertisement">Close</button>
        <span className="interstitial-label">Advertisement</span>
        <div
          id="finvexo-interstitial-ad-slot"
          className="interstitial-slot"
          data-mobile-size="336x600"
          data-desktop-size="1200x700"
        >
          {(
            <div className="interstitial-preview vignette-preview">
              <span className="vignette-info" aria-label="Ad information">ⓘ</span>
              <div className="vignette-brand"><img className="vignette-logo-image" src="/Finvexo.png" alt="Finvexo" /></div>
              <h2>Engineer Data Solutions</h2>
              <p>Build expertise in big data platforms and cloud data engineering.</p>
              <span className="vignette-program">Finvexo Professional Learning</span>
              <button className="vignette-open" type="button" onClick={closeAd}>Open</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}










