import React, { useEffect, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./style.css";
import { Home, Hub, Article, Info, NotFound } from "./pages";
import { GamePortal } from "./games";
import { InterstitialAd } from "./components-gam";
import { GPTLoader } from "./gam-ads";

// Suppress harmless third-party script errors (web-vitals, extensions, etc.)
window.addEventListener("error", (event) => {
  // Ignore web-vitals library errors from browser extensions
  if (
    event.message &&
    (event.message.includes("reportAllChanges") ||
      event.message.includes("startTime") ||
      event.filename?.includes("chrome-extension://"))
  ) {
    event.preventDefault();
    return false;
  }
});


function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation();

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    if (hash) return undefined;
    const resetPosition = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    resetPosition();
    const firstFrame = window.requestAnimationFrame(() => {
      resetPosition();
      window.requestAnimationFrame(resetPosition);
    });
    const delayedReset = window.setTimeout(resetPosition, 120);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearTimeout(delayedReset);
    };
  }, [pathname, search, hash, key]);

  return null;
}
function App() {
  return (
    <>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/play/*" element={<GamePortal />} />
          <Route path="/en/carFinance/:slug?/*" element={<Article category="car" />} />
          <Route path="/en/healthFinance/:slug?/*" element={<Article category="health" />} />
          <Route path="/car-finance" element={<Navigate to="/en/carFinance" replace />} />
          <Route path="/health-insurance" element={<Navigate to="/en/healthFinance" replace />} />
          <Route path="/en/:page/index.html" element={<Info />} />
          <Route path="/en/:page" element={<Info />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ScrollToTop />
      <GPTLoader />
      <InterstitialAd />
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);





