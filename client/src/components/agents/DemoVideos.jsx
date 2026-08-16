import { useState, useEffect, useRef, useCallback } from "react";
import charlotteVideo1 from "../../assets/videos/charlotte-video1.mp4";
import charlotteVideo2 from "../../assets/videos/charlotte-video2.mp4";
import charlotteVideo3 from "../../assets/videos/charlotte-video3.mp4";
import charlotteVideo4 from "../../assets/videos/charlotte-video4.mp4";
import charlotteVideo5 from "../../assets/videos/charlotte-video5.mp4";
import charlotteStatic1 from "../../assets/agents/charlotte-static1.avif";
import charlotteStatic2 from "../../assets/agents/charlotte-static2.avif";
import charlotteStatic3 from "../../assets/agents/charlotte-static3.avif";
import charlotteStatic4 from "../../assets/agents/charlotte-static4.avif";
import "../../styles/agents/DemoVideos.css";

const videoCards = [
  { id: 1, type: "video", src: charlotteVideo1, label: "Créative vidéo 01" },
  { id: 2, type: "video", src: charlotteVideo2, label: "Créative vidéo 02" },
  { id: 3, type: "video", src: charlotteVideo3, label: "Créative vidéo 03" },
  { id: 4, type: "video", src: charlotteVideo4, label: "Créative vidéo 04" },
  { id: 5, type: "video", src: charlotteVideo5, label: "Créative vidéo 05" },
];

const staticCards = [
  { id: 1, type: "image", src: charlotteStatic1, label: "Créative statique 01" },
  { id: 2, type: "image", src: charlotteStatic2, label: "Créative statique 02" },
  { id: 3, type: "image", src: charlotteStatic3, label: "Créative statique 03" },
  { id: 4, type: "image", src: charlotteStatic4, label: "Créative statique 04" },
];

const TABS = [
  { id: "videos", label: "Créatives vidéos", cards: videoCards },
  { id: "statics", label: "Créatives statiques", cards: staticCards },
];

const AUTOPLAY_MS = 3200;
const TRANSITION_MS = 700;

export default function DemoVideos() {
  const [activeTab, setActiveTab] = useState("videos");
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  const currentTab = TABS.find((t) => t.id === activeTab);
  const realCards = currentTab.cards;
  // On duplique la série pour un rebouclage invisible
  const extendedCards = [...realCards, ...realCards];

  // Reset propre au changement d'onglet
  useEffect(() => {
    setWithTransition(false);
    setIndex(0);
    const raf = requestAnimationFrame(() => setWithTransition(true));
    return () => cancelAnimationFrame(raf);
  }, [activeTab]);

  // Autoplay : avance d'une card toutes les X ms
  useEffect(() => {
    if (isPaused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, activeTab]);

  // Quand on dépasse la série réelle, on saute au début sans transition (boucle infinie)
  const handleTransitionEnd = useCallback(() => {
    if (index >= realCards.length) {
      setWithTransition(false);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWithTransition(true));
      });
    }
  }, [index, realCards.length]);

  const goTo = useCallback((direction) => {
    setIndex((i) => i + direction);
  }, []);

  return (
    <section className="demo-videos-section">
      <div className="demo-videos-container">
        {/* Tabs */}
        <div className="demo-videos__tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`demo-videos__tab ${
                activeTab === tab.id ? "is-active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div
          className="demo-videos__slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <button
            type="button"
            className="demo-videos__nav demo-videos__nav--prev"
            onClick={() => goTo(-1)}
            aria-label="Créative précédente"
          >
            ‹
          </button>

          <div className="demo-videos__viewport">
            <div
              className="demo-videos__track"
              ref={trackRef}
              style={{
                transform: `translateX(calc(-${index} * (var(--card-w) + var(--card-gap))))`,
                transition: withTransition
                  ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedCards.map((item, i) => (
                <div className="demo-videos__card" key={`${item.id}-${i}`}>
                  {item.type === "video" ? (
                    <video
                      className="demo-videos__media"
                      src={item.src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                  ) : (
                    <img
                      className="demo-videos__media"
                      src={item.src}
                      alt={item.label}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="demo-videos__nav demo-videos__nav--next"
            onClick={() => goTo(1)}
            aria-label="Créative suivante"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}