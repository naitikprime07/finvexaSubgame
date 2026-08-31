import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { games, gameCategories } from "./gameData";
import { GAMAdUnit } from "./gam-ads";

const infoPages = {
  "about_us.html": {
    title: "About Our Games",
    intro:
      "A focused browser-game library designed for quick play, clear navigation, and easy discovery on phones, tablets, and desktop screens.",
    sections: [
      {
        heading: "What We Offer",
        text: "The collection brings puzzle, arcade, racing, sports, platform, board, casual, shooter, word, and 3D games into one consistent player experience. Games open inside the site so players can move from discovery to play without visiting a separate game portal.",
      },
      {
        heading: "How We Choose Games",
        text: "We favor games that start quickly, have understandable goals, support common browser controls, and remain enjoyable in short or extended sessions. Category labels, posters, summaries, and play instructions are organized to help players choose confidently.",
      },
      {
        heading: "Our Design Approach",
        text: "The interface uses responsive poster grids, searchable categories, direct game routes, and player-friendly detail panels. We continue improving cover artwork, controls guidance, accessibility, and performance as the library grows.",
      },
    ],
  },
  "adsense_disclaimer.html": {
    title: "Advertising Information",
    intro:
      "Advertising spaces help support hosting, maintenance, and ongoing improvements while the game library remains freely accessible.",
    sections: [
      {
        heading: "Advertisement Placement",
        text: "Reserved advertising areas may appear around the catalog or game page. Ads are kept separate from play controls so an advertisement is not presented as a game button, download, or navigation action.",
      },
      {
        heading: "Third-Party Delivery",
        text: "When advertising is enabled, an advertising provider may select and measure ads using its own technologies and policies. The provider—not the game itself—controls the advertisement content and delivery process.",
      },
      {
        heading: "Your Choices",
        text: "Browser privacy controls, cookie settings, and advertising-provider preference tools may be used to limit personalization. Blocking an advertisement should not prevent locally hosted games from loading.",
      },
    ],
  },
  "privacy_policy.html": {
    title: "Privacy Policy",
    intro:
      "We aim to keep game access simple and collect no more information than is reasonably needed to operate and improve the website.",
    sections: [
      {
        heading: "Game Activity",
        text: "Games run in the browser. Some titles may store settings or scores in local browser storage on your device. Clearing site data may remove those saved preferences or scores.",
      },
      {
        heading: "Technical Information",
        text: "A hosting or analytics service may process routine technical information such as browser type, approximate region, requested pages, timestamps, and error events. This information is generally used for security, reliability, and aggregate usage analysis.",
      },
      {
        heading: "Advertising and Cookies",
        text: "If advertising or analytics is enabled, those providers may use cookies or similar browser storage under their own privacy terms. Available consent or browser controls can be used to manage those technologies.",
      },
      {
        heading: "Safety and Retention",
        text: "We do not ask players to enter passwords, payment details, or sensitive personal information to start a game. Operational records should be retained only as long as needed for security, troubleshooting, legal obligations, or service improvement.",
      },
    ],
  },
  "terms_of_use.html": {
    title: "Terms of Use",
    intro:
      "These practical rules help keep the website safe, reliable, and enjoyable for every player.",
    sections: [
      {
        heading: "Acceptable Use",
        text: "Use the website for lawful personal entertainment. Do not attempt to damage the service, bypass security measures, overload game resources, inject harmful code, or interfere with another visitor's experience.",
      },
      {
        heading: "Game Availability",
        text: "Games and features may be corrected, updated, reorganized, or removed. We work to keep the library available, but uninterrupted operation on every browser, device, or network cannot be guaranteed.",
      },
      {
        heading: "Scores and Progress",
        text: "Browser-stored scores, settings, and progress may be lost when storage is cleared, a game is updated, or a device changes. Unless a feature explicitly says otherwise, game results are for entertainment and do not represent prizes or monetary value.",
      },
      {
        heading: "Responsibility",
        text: "Players are responsible for using a compatible device and taking reasonable breaks. The website and games are provided for general entertainment without a promise that every title will suit every player's preferences or ability.",
      },
    ],
  },
  "contact_us.html": {
    title: "Contact and Support",
    intro:
      "Helpful reports make the game library better. When sending feedback, include enough detail for the issue to be reproduced.",
    sections: [
      {
        heading: "Report a Game Problem",
        text: "Include the game name, page address, device, browser, and what happened before the problem appeared. A screenshot and the expected behavior are especially useful for layout, loading, audio, or control issues.",
      },
      {
        heading: "Suggest an Improvement",
        text: "Suggestions are welcome for new categories, clearer descriptions, better posters, accessibility improvements, mobile controls, and interface refinements. Describe the player problem your idea would solve.",
      },
      {
        heading: "Rights or Safety Concerns",
        text: "For a copyright, licensing, privacy, or safety concern, identify the relevant game or page and explain the issue clearly. Include a reliable way to follow up through the contact channel published on the main website.",
      },
    ],
  },
};
function GameAd({ name }) {
  const [adState, setAdState] = useState('loading'); // 'loading' | 'filled' | 'empty'
  const largeMobileSlot = name === "top" || name === "detail-top";
  const slots = {
    top: import.meta.env.VITE_AD_BANNER_CATALOG_TOP || "",
    bottom: import.meta.env.VITE_AD_BANNER_CATALOG_BOTTOM || "",
    "detail-top": import.meta.env.VITE_AD_BANNER_GAME_TOP || "",
    "detail-mid": import.meta.env.VITE_AD_BANNER_GAME_MID || "",
    "detail-bottom": import.meta.env.VITE_AD_BANNER_GAME_BOTTOM || "",
  };
  const adUnitPath = slots[name] || "";
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
  const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";
  const live = adsEnabled && Boolean(gamNetworkCode) && Boolean(adUnitPath);

  // Use stable slot ID with useRef - generates ID once on mount
  const slotIdRef = useRef();
  if (!slotIdRef.current) {
    slotIdRef.current = `gam-${name}-${Math.random().toString(36).substr(2, 9)}`;
  }

  if (!live) return null;

  const mobileSizes = useMemo(() => (
    largeMobileSlot
      ? [[336, 280], [300, 250]]
      : [[320, 100], [320, 50], [300, 50]]
  ), [largeMobileSlot]);
  const desktopSizes = useMemo(() => [[970, 90], [728, 90]], []);
  const adSizes = useMemo(() => [...desktopSizes, ...mobileSizes], [desktopSizes, mobileSizes]);
  const sizeMapping = useMemo(() => [
    { viewport: [769, 0], sizes: desktopSizes },
    { viewport: [336, 0], sizes: mobileSizes },
    { viewport: [0, 0], sizes: largeMobileSlot ? [[300, 250]] : [[300, 50]] }
  ], [desktopSizes, largeMobileSlot, mobileSizes]);

  const handleAdStateChange = useCallback((state) => {
    setAdState(state);
  }, []);

  // Like reference site - always render, GAMAdUnit handles visibility internally
  return (
    <aside
      className={`game-ad ${largeMobileSlot ? "game-ad-large" : "game-ad-banner"}`}
      aria-label="Advertisement"
      style={{ display: adState === 'empty' ? 'none' : 'block' }}
    >
      <div
        className="ad-slot-frame"
        data-desktop-size="970x90"
        data-mobile-size={largeMobileSlot ? "336x280" : "320x100"}
      >
        <GAMAdUnit
          adUnitPath={adUnitPath}
          slotId={slotIdRef.current}
          sizes={adSizes}
          sizeMapping={sizeMapping}
          onAdStateChange={handleAdStateChange}
        />
      </div>
    </aside>
  );
}
const CATEGORY_ICONS = {
  puzzle: "🧩",
  arcade: "🕹️",
  shooter: "🎯",
  racing: "🏎️",
  sports: "⚽",
  platformer: "🏃",
  casual: "🎈",
  board: "♟️",
  "word-quiz": "📝",
  "3d": "🌐",
};
function categoryIcon(id) {
  return CATEGORY_ICONS[id] || "🎮";
}
function GameHeader({
  query,
  setQuery,
  active,
  setActive,
  showCategories = true,
}) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const selectCategory = (categoryId) => {
    setQuery("");
    setActive(categoryId);
    setMenu(false);
    setCategoryMenu(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const catalog = document.getElementById("all-categories");
        if (catalog)
          catalog.scrollIntoView({ behavior: "auto", block: "start" });
        else window.scrollTo(0, 0);
      });
    });
  };
  const goToAllCategories = () => selectCategory("all");
  return (
    <>
      <header className="game-header">
        <button className="hamburger" onClick={() => setMenu(true)}>
          ☰
        </button>
        <Link className="game-brand finvexo-brand" to="/" aria-label="Home">
          <img className="brand-logo-image" src="/Finvexa.png" alt="Finvexa" />
        </Link>
        <form
          className="game-search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const catalog = document.getElementById("all-categories");
            if (catalog)
              catalog.scrollIntoView({ behavior: "smooth", block: "start" });
            else navigate("/play#all-categories");
          }}
        >
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
          <label className="sr-only" htmlFor="game-search-input">
            Search games
          </label>
          <input
            id="game-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search games by name..."
            autoComplete="off"
          />
          {query && (
            <button
              className="search-clear"
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button
            className="search-submit"
            type="submit"
            aria-label="Search games"
          >
            Search
          </button>
        </form>
        <nav>
          <Link to="/play#all-categories" onClick={goToAllCategories}>
            Home
          </Link>
          <Link to="/play/about_us.html">About</Link>
          <Link to="/play/privacy_policy.html">Privacy</Link>
          <Link to="/play/contact_us.html">Contact</Link>
        </nav>
        {showCategories && (
          <button
            className="category-menu-button"
            onClick={() => setCategoryMenu((open) => !open)}
          >
            🎮 Categories <span>⌄</span>
          </button>
        )}
        {showCategories && categoryMenu && (
          <div className="category-dropdown">
            <button
              className={active === "all" ? "active" : ""}
              onClick={() => selectCategory("all")}
            >
              All Games
            </button>
            {gameCategories.map((c) => (
              <button
                key={c.id}
                className={active === c.id ? "active" : ""}
                onClick={() => selectCategory(c.id)}
              >
                {categoryIcon(c.id)} {c.label}
              </button>
            ))}
          </div>
        )}
      </header>
      {showCategories && (
        <div className="game-pills">
          <button
            className={active === "all" ? "active" : ""}
            onClick={() => selectCategory("all")}
          >
            ☀️ All
          </button>
          {gameCategories.map((c) => (
            <button
              key={c.id}
              className={active === c.id ? "active" : ""}
              onClick={() => selectCategory(c.id)}
            >
              {categoryIcon(c.id)} {c.label}
            </button>
          ))}
        </div>
      )}
      <aside className={`game-drawer ${menu ? "open" : ""}`}>
        <button onClick={() => setMenu(false)}>×</button>
        <Link to="/play#all-categories" onClick={goToAllCategories}>
          🏠 Home
        </Link>
        <Link to="/play/about_us.html">ℹ️ About Us</Link>
        <Link to="/play/adsense_disclaimer.html">📢 Adsense Disclaimer</Link>
        <Link to="/play/privacy_policy.html">🔒 Privacy Policy</Link>
        <Link to="/play/terms_of_use.html">📄 Terms and Condition</Link>
        <Link to="/play/contact_us.html">✉️ Contact Us</Link>
      </aside>
      {menu && <div className="drawer-scrim" onClick={() => setMenu(false)} />}
    </>
  );
}
function GameFooter() {
  return (
    <footer className="game-footer">
      <div className="footer-content">
        <section className="footer-about">
          <Link
            className="footer-game-brand finvexo-brand"
            to="/"
            aria-label="Home"
          >
            <img
              className="brand-logo-image"
              src="/Finvexa.png"
              alt="Finvexa"
            />
          </Link>
          <p>
            Quick browser games, organized for simple discovery and comfortable
            play across desktop, tablet, and mobile screens.
          </p>
        </section>
        <section>
          <h3>Explore Games</h3>
          <Link to="/play?category=all#all-categories">All Games</Link>
          <Link to="/play?category=arcade#all-categories">Arcade Games</Link>
          <Link to="/play?category=puzzle#all-categories">Puzzle Games</Link>
          <Link to="/play?category=sports#all-categories">Sports Games</Link>
        </section>
        <section>
          <h3>Information</h3>
          <Link to="/play/about_us.html">About Us</Link>
          <Link to="/play/contact_us.html">Contact and Support</Link>
          <Link to="/play/adsense_disclaimer.html">
            Advertising Information
          </Link>
        </section>
        <section>
          <h3>Policies</h3>
          <Link to="/play/privacy_policy.html">Privacy Policy</Link>
          <Link to="/play/terms_of_use.html">Terms of Use</Link>
        </section>
      </div>
      <div className="footer-bottom">
        <span>Browser games for quick, accessible entertainment.</span>
        <span>Copyright © 2026 Finvexa</span>
      </div>
    </footer>
  );
}
function hueFor(text) {
  return [...text].reduce((n, c) => n + c.charCodeAt(0), 0) % 360;
}
function coverFor(game) {
  return game.poster || game.screenshot || null;
}
// Inline ad component that fits in game grid
function InlineAd({ position }) {
  const [adState, setAdState] = useState('loading');
  const adUnitPath = import.meta.env.VITE_AD_BANNER_CATALOG_MID || import.meta.env.VITE_AD_BANNER_HOME_TOP || "";
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED === "true";
  const gamNetworkCode = import.meta.env.VITE_GAM_NETWORK_CODE || "";
  const live = adsEnabled && Boolean(gamNetworkCode) && Boolean(adUnitPath);

  const slotIdRef = useRef(`gam-inline-${position}-${Math.random().toString(36).substr(2, 9)}`);

  const adSizes = useMemo(() => [[336, 280], [300, 250], [320, 100], [320, 50]], []);
  const sizeMapping = useMemo(() => [
    { viewport: [336, 0], sizes: adSizes },
    { viewport: [0, 0], sizes: [[300, 250]] }
  ], [adSizes]);

  const handleAdStateChange = useCallback((state) => {
    setAdState(state);
  }, []);

  if (!live || adState === 'empty') return null;

  // Inline ad card that looks like a game card but contains an ad
  return (
    <div
      className="game-card inline-ad-card"
      style={{
        display: adState === 'empty' ? 'none' : 'grid',
        placeItems: 'center',
        background: '#1a1a2e',
        border: '1px solid #2a2a3e',
        padding: '0',
        overflow: 'hidden'
      }}
    >
      <GAMAdUnit
        adUnitPath={adUnitPath}
        slotId={slotIdRef.current}
        sizes={adSizes}
        sizeMapping={sizeMapping}
        onAdStateChange={handleAdStateChange}
      />
    </div>
  );
}

function Cards({ items }) {
  const itemsWithAds = [];
  const AD_INTERVAL = 6; // Show ad after every 6 games

  items.forEach((g, index) => {
    // Add game card
    itemsWithAds.push(
      <Link className="game-card" key={g.slug} to={`/play/${g.slug}.html`}>
        <div
          className="local-cover"
          style={{ "--game-hue": hueFor(g.slug) }}
          aria-hidden="true"
        >
          {coverFor(g) && (
            <img
              src={coverFor(g)}
              alt=""
              loading="lazy"
              onError={(e) => e.currentTarget.remove()}
            />
          )}
          <b>{g.name.slice(0, 2).toUpperCase()}</b>
          <i>▶</i>
        </div>
        <span>{g.name}</span>
      </Link>
    );

    // Add inline ad after every AD_INTERVAL games
    if ((index + 1) % AD_INTERVAL === 0 && index < items.length - 1) {
      itemsWithAds.push(<InlineAd key={`ad-${index}`} position={index} />);
    }
  });

  return (
    <div className="game-grid">
      {itemsWithAds}
    </div>
  );
}
function Catalog({ query, active }) {
  const q = query.trim().toLowerCase();
  if (q) {
    const found = games.filter((g) => g.name.toLowerCase().includes(q));
    return (
      <section className="catalog" id="all-categories">
        <div className="cat-heading">
          <h2>Search Results</h2>
          <span>{found.length} games</span>
        </div>
        {found.length ? (
          <Cards items={found} />
        ) : (
          <p className="no-games">No games found.</p>
        )}
      </section>
    );
  }
  const cats =
    active === "all"
      ? gameCategories
      : gameCategories.filter((c) => c.id === active);
  return (
    <div className="catalog" id="all-categories">
      {cats.map((c) => {
        const items = games.filter((g) => g.cats.includes(c.id));
        return (
          <section className="game-category" key={c.id}>
            <div className="cat-heading">
              <h2>
                {categoryIcon(c.id)} {c.label}
              </h2>
              <span>
                {c.desc} — {items.length} games
              </span>
            </div>
            <Cards items={items} />
          </section>
        );
      })}
    </div>
  );
}
function LocalHtmlGame({ game }) {
  const [frameHeight, setFrameHeight] = useState(620);
  const fitGame = (event) => {
    const frame = event.currentTarget;
    try {
      const doc = frame.contentDocument;
      if (!doc) return;
      const style = doc.createElement("style");
      style.dataset.hostResponsive = "true";
      style.textContent = `
        html, body { max-width: 100%; overflow-x: hidden !important; }
        canvas { max-width: 100% !important; height: auto !important; }
        img, video { max-width: 100%; height: auto; }
      `;
      if (!doc.head.querySelector("style[data-host-responsive]"))
        doc.head.appendChild(style);
      const measure = () => {
        const height = Math.max(
          doc.documentElement.scrollHeight,
          doc.body?.scrollHeight || 0,
          doc.documentElement.offsetHeight,
          doc.body?.offsetHeight || 0,
        );
        setFrameHeight(Math.max(420, Math.min(height + 2, 1800)));
      };
      requestAnimationFrame(measure);
      setTimeout(measure, 150);
      setTimeout(measure, 700);
    } catch {
      setFrameHeight(700);
    }
  };
  return (
    <div className="local-html-game" style={{ height: frameHeight }}>
      <iframe
        title={game.name}
        src={game.localFile}
        scrolling="no"
        onLoad={fitGame}
      />
    </div>
  );
}
function howToPlayFor(game) {
  const controls = {
    puzzle:
      "Use the mouse or touch controls to select, place, match, or move pieces. Study the board carefully and complete the objective shown inside the game.",
    arcade:
      "Use the on-screen controls, mouse, or arrow keys to react quickly. Avoid hazards, collect opportunities, and aim for the highest score.",
    shooter:
      "Aim with the mouse or touch controls and use the displayed fire control. Watch enemy movement, avoid incoming danger, and clear each wave.",
    racing:
      "Steer with the arrow keys, WASD, or on-screen controls. Avoid traffic and obstacles while maintaining speed and progressing as far as possible.",
    sports:
      "Use the mouse, touch controls, or keys shown by the game. Time each move carefully to score more points than your opponent.",
    platformer:
      "Move with the arrow keys, WASD, or on-screen controls. Jump between platforms, avoid traps, and reach the goal safely.",
    casual:
      "Use simple mouse or touch controls and follow the prompts shown inside the game. Complete the objective at your own pace.",
    board:
      "Select and move pieces using the mouse or touch controls. Follow the classic rules and plan ahead to defeat the computer opponents.",
    "word-quiz":
      "Choose or enter answers using the keyboard, mouse, or touch controls. Use the available clues and solve each challenge before time runs out.",
    "3d": "Use the keyboard, mouse, or on-screen controls displayed by the game. Explore the 3D play area and complete the current objective while avoiding hazards.",
  };
  return (
    controls[game.category] ||
    "Follow the controls and objective displayed inside the game. Use your mouse, keyboard, or touch screen to play."
  );
}
function GameDetail({ slug, query, active }) {
  const game = games.find((g) => g.slug === slug) || games[0];
  const [playing, setPlaying] = useState(false);
  const playAreaRef = useRef(null);
  useEffect(() => {
    setPlaying(false);
    requestAnimationFrame(() => {
      playAreaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [slug]);
  return (
    <main className="game-detail">
      <GameAd name="detail-top" />
      <h1>Play {game.name}</h1>
      <div
        className={`play-area ${playing ? "local-file-active" : ""}`}
        ref={playAreaRef}
      >
        {playing ? (
          <LocalHtmlGame game={game} />
        ) : (
          <div
            className="game-display-poster"
            style={{ "--game-hue": hueFor(game.slug) }}
          >
            {coverFor(game) && (
              <img src={coverFor(game)} alt={`${game.name} poster`} />
            )}
            <button onClick={() => setPlaying(true)}>Play Game</button>
          </div>
        )}
      </div>
      <GameAd name="detail-mid" />
      <article className="game-description-card">
        <span className="description-label">GAME DETAILS</span>
        <h2>{game.name}</h2>
        <p className="game-summary">{game.description}</p>
        <h3>How to Play</h3>
        <p>{howToPlayFor(game)}</p>
      </article>
      <GameAd name="detail-bottom" />
      <Catalog query="" active="all" />
    </main>
  );
}
export function GamePortal() {
  const { pathname, search, hash } = useLocation();
  const file = pathname.split("/").filter(Boolean).pop() || "";
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  useEffect(() => {
    const requested = new URLSearchParams(search).get("category");
    if (
      requested === "all" ||
      gameCategories.some((category) => category.id === requested)
    )
      setActive(requested || "all");
  }, [search]);
  useEffect(() => {
    if (hash === "#all-categories") {
      window.requestAnimationFrame(() =>
        document
          .getElementById("all-categories")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, [pathname, search, hash]);
  const info = infoPages[file];
  const slug = file.endsWith(".html") ? file.slice(0, -5) : "";
  const isGame = slug && !info;
  return (
    <div className="games-site">
      <GameHeader
        query={query}
        setQuery={setQuery}
        active={active}
        setActive={setActive}
        showCategories={!info}
      />
      {info ? (
        <main className="game-info">
          <span className="info-eyebrow">PLAYER INFORMATION</span>
          <h1>{info.title}</h1>
          <p className="info-intro">{info.intro}</p>
          <div className="info-sections">
            {info.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
        </main>
      ) : isGame ? (
        <GameDetail slug={slug} query={query} active={active} />
      ) : (
        <>
          <GameAd name="top" />
          <Catalog query={query} active={active} />
          <GameAd name="bottom" />
        </>
      )}
      <GameFooter />
    </div>
  );
}
