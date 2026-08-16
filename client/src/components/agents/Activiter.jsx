import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { Globe } from "lucide-react";
import { FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa6";
import charlotteImage1 from "../../assets/agents/charlotte-pub1.avif";
import charlotteImage2 from "../../assets/agents/charlotte-pub2.avif";
import charlotteImage3 from "../../assets/agents/charlotte-pub3.avif";
import charlotteLogo from "../../assets/agents/charlotte-logo.webp";
import charlottePreview from "../../assets/agents/charlotte-preview.avif";
import charlottePerf from "../../assets/agents/charlotte-performance.webp";
import "../../styles/agents/Activiter.css";

const activitiesData = [
  {
    id: 1,
    icon: "🚀",
    accent: "#8b5cf6",
    title: "Volume créatif multiplié par 4",
    description: "Basé sur une étude INT menée sur +3 000 utilisateurs",
    slide: {
      heading: "Performance maximale",
      text: "Nos architectures garantissent des temps de chargement ultra-rapides et une scalabilité sans faille.",
      custom: {
        button: "Générer",
        topCards: [
          { icon: "⚡", title: "Génération rapide", text: "" },
          { icon: "✨", title: "Votre ADN créatif", text: "" },
          { icon: "🖼️", title: "+200 créatives", text: "" },
        ],
        images: [
          { src: charlotteImage1, alt: "Aperçu 1 de la plateforme" },
          { src: charlotteImage2, alt: "Aperçu 2 de la plateforme" },
          { src: charlotteImage3, alt: "Aperçu 3 de la plateforme" },
        ],
      },
    },
  },
  {
    id: 2,
    icon: "💡",
    accent: "#d946ef",
    title: "Des créatives qui ressemblent vraiment à votre marque",
    description: "Basées sur l'analyse complète de votre univers de marque.",
    slide: {
      heading: "Stratégie & analyse",
      text: "Nous étudions chaque détail de votre projet pour concevoir une feuille de route sur mesure.",
      brandCustom: {
        urlLabel: "URL de votre site web",
        urlPlaceholder: "sisyphus.com",
        generateLabel: "Générer votre ADN créative",
        brandColors: ["#8438ff", "#33ffb8", "#3e5bff"],
        logo: charlotteLogo,
        typography: "Geist",
        style: "Professionnel",
      },
    },
  },
  {
    id: 3,
    icon: "🔒",
    accent: "#6366f1",
    title: "Stratégie éditoriale callibrée pour  +70% d'engagement",
    description: "Basé sur les tendances et signaux du marché",
    slide: {
      heading: "Sécurité avancée",
      text: "Mise en place de protocoles stricts pour assurer l'intégrité et la confidentialité de vos actifs.",
      contentPreview: {
        image: charlottePreview,
        statusLabel: "Description",
        statusText: "Rédaction par IA en cours...",
        description:
          "Rencontrez la boisson qui change tout ! Un bénéfice absolu dans la santé quotidienne pour tous...",
        linkText: "Voir plus",
        publishLabel: "Publier directement",
      },
    },
  },
  {
    id: 4,
    icon: "📈",
    accent: "#ec4899",
    title: "Une Intelligence créative qui s'améliore en continu",
    description: "Améliorée par l'analyse continue des performances",
    slide: {
      heading: "Suivi & analytique",
      text: "Des tableaux de bord intuitifs pour suivre l'évolution de vos indicateurs clés de succès.",
      performanceCustom: {
        image: charlottePerf,
        enrichLogo: charlotteLogo,
        enrichText: "Enrichissement régulier des données",
        chartTitle: "Performance des créatives",
        chartPeriod: "(30 derniers jours)",
        chartColor: "#ec4899",
      },
    },
  },
];

const AUTOPLAY_MS = 4500;
const CENTER_CARD_TITLE = "Votre ADN créatif";

export default function Activiter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const slide1Ref = useRef(null);
  const btnRef = useRef(null);
  const topCardRefs = useRef([]);
  const imageRefs = useRef([]);
  const [connector, setConnector] = useState(null);

  const brandSlideRef = useRef(null);
  const brandInputRef = useRef(null);
  const brandBtnRef = useRef(null);
  const brandCardRefs = useRef([]);
  const [brandConnector, setBrandConnector] = useState(null);

  const contentSlideRef = useRef(null);
  const contentCardRef = useRef(null);
  const contentBtnRef = useRef(null);
  const [contentConnector, setContentConnector] = useState(null);

  // --- Slide 4 : connecteur Enrichissement -> Performance ---
  const perfSlideRef = useRef(null);
  const perfEnrichCardRef = useRef(null);
  const perfChartCardRef = useRef(null);
  const [perfConnector, setPerfConnector] = useState(null);

  const centerCardIndex = activitiesData[0].slide.custom.topCards.findIndex(
    (c) => c.title === CENTER_CARD_TITLE
  );

  // --- Slide 1 : bouton -> card du milieu (3 lignes parallèles) + card -> 3 images ---
  const recomputeConnector = useCallback(() => {
    const container = slide1Ref.current;
    const btn = btnRef.current;
    const centerCard = topCardRefs.current[centerCardIndex];
    const images = imageRefs.current;

    if (
      !container ||
      !btn ||
      !centerCard ||
      images.length < 3 ||
      images.some((i) => !i)
    ) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const pointAt = (el, edge) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - containerRect.left,
        y: (edge === "top" ? r.top : r.bottom) - containerRect.top,
      };
    };

    const btnBottom = pointAt(btn, "bottom");
    const centerTop = pointAt(centerCard, "top");
    const centerBottom = pointAt(centerCard, "bottom");

    const getTargetPoint = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - containerRect.left,
        y: r.top - containerRect.top + 4,
      };
    };

    const i0Top = getTargetPoint(images[0]);
    const i1Top = getTargetPoint(images[1]);
    const i2Top = getTargetPoint(images[2]);

    const radius = 10;
    const lineSpacing = 7;

    const topPath = `
      M ${btnBottom.x - lineSpacing} ${btnBottom.y} L ${
      centerTop.x - lineSpacing
    } ${centerTop.y}
      M ${btnBottom.x} ${btnBottom.y} L ${centerTop.x} ${centerTop.y}
      M ${btnBottom.x + lineSpacing} ${btnBottom.y} L ${
      centerTop.x + lineSpacing
    } ${centerTop.y}
    `;

    const archY = centerBottom.y + (i1Top.y - centerBottom.y) * 0.45;
    const iLeftX = i0Top.x;
    const iRightX = i2Top.x;

    const bottomArch = `
      M ${centerBottom.x} ${centerBottom.y} 
      L ${centerBottom.x} ${archY - radius} 
      Q ${centerBottom.x} ${archY} ${
      centerBottom.x > iLeftX
        ? centerBottom.x - radius
        : centerBottom.x + radius
    } ${archY} 
      L ${iLeftX + radius} ${archY} 
      Q ${iLeftX} ${archY} ${iLeftX} ${archY + radius} 
      L ${iLeftX} ${i0Top.y}
      
      M ${centerBottom.x} ${archY} 
      L ${iRightX - radius} ${archY} 
      Q ${iRightX} ${archY} ${iRightX} ${archY + radius} 
      L ${iRightX} ${i2Top.y}
      
      M ${centerBottom.x} ${centerBottom.y}
      L ${i1Top.x} ${i1Top.y}
    `;

    setConnector({
      width: containerRect.width,
      height: containerRect.height,
      d: `${topPath} ${bottomArch}`,
    });
  }, [centerCardIndex]);

  const recomputeBrandConnector = useCallback(() => {
    const container = brandSlideRef.current;
    const input = brandInputRef.current;
    const btn = brandBtnRef.current;
    const cards = brandCardRefs.current;

    if (
      !container ||
      !input ||
      !btn ||
      cards.length < 2 ||
      cards.some((c) => !c)
    ) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const pointAt = (el, edge) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - containerRect.left,
        y: (edge === "top" ? r.top : r.bottom) - containerRect.top,
      };
    };

    const inputBottom = pointAt(input, "bottom");
    const btnTop = pointAt(btn, "top");
    const btnBottom = pointAt(btn, "bottom");
    const card1Top = pointAt(cards[0], "top");
    const card2Top = pointAt(cards[1], "top");

    const lineSpacing = 7;

    const bundlePath = `
      M ${inputBottom.x - lineSpacing} ${inputBottom.y} L ${
      btnTop.x - lineSpacing
    } ${btnTop.y}
      M ${inputBottom.x} ${inputBottom.y} L ${btnTop.x} ${btnTop.y}
      M ${inputBottom.x + lineSpacing} ${inputBottom.y} L ${
      btnTop.x + lineSpacing
    } ${btnTop.y}
    `;

    const radius = 10;
    const trunkY = btnBottom.y + 14;
    const midY = trunkY + (Math.min(card1Top.y, card2Top.y) - trunkY) * 0.5;

    const roundedElbow = (fromX, fromY, toX, toY) => {
      const dir = toX >= fromX ? 1 : -1;
      if (Math.abs(toX - fromX) < radius * 2) {
        return `M ${fromX} ${fromY} L ${toX} ${toY}`;
      }
      return `
        M ${fromX} ${fromY}
        L ${fromX} ${midY - radius}
        Q ${fromX} ${midY} ${fromX + dir * radius} ${midY}
        L ${toX - dir * radius} ${midY}
        Q ${toX} ${midY} ${toX} ${midY + radius}
        L ${toX} ${toY}
      `;
    };

    const trunkPath = `M ${btnBottom.x} ${btnBottom.y} L ${btnBottom.x} ${trunkY}`;
    const branchToCard1 = roundedElbow(
      btnBottom.x,
      trunkY,
      card1Top.x,
      card1Top.y
    );
    const branchToCard2 = roundedElbow(
      btnBottom.x,
      trunkY,
      card2Top.x,
      card2Top.y
    );

    setBrandConnector({
      width: containerRect.width,
      height: containerRect.height,
      d: `${bundlePath} ${trunkPath} ${branchToCard1} ${branchToCard2}`,
    });
  }, []);

  const recomputeContentConnector = useCallback(() => {
    const container = contentSlideRef.current;
    const card = contentCardRef.current;
    const btn = contentBtnRef.current;

    if (!container || !card || !btn) return;

    const containerRect = container.getBoundingClientRect();
    const pointAt = (el, edge) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - containerRect.left,
        y: (edge === "top" ? r.top : r.bottom) - containerRect.top,
      };
    };

    const cardBottom = pointAt(card, "bottom");
    const btnTop = pointAt(btn, "top");
    const lineSpacing = 7;

    const d = `
      M ${cardBottom.x - lineSpacing} ${cardBottom.y} L ${
      btnTop.x - lineSpacing
    } ${btnTop.y}
      M ${cardBottom.x} ${cardBottom.y} L ${btnTop.x} ${btnTop.y}
      M ${cardBottom.x + lineSpacing} ${cardBottom.y} L ${
      btnTop.x + lineSpacing
    } ${btnTop.y}
    `;

    setContentConnector({
      width: containerRect.width,
      height: containerRect.height,
      d,
    });
  }, []);

  // --- Slide 4 : calcul du connecteur Enrichissement -> Performance ---
  const recomputePerfConnector = useCallback(() => {
    const container = perfSlideRef.current;
    const fromEl = perfEnrichCardRef.current;
    const toEl = perfChartCardRef.current;

    if (!container || !fromEl || !toEl) return;

    const containerRect = container.getBoundingClientRect();
    const pointAt = (el, edge) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - containerRect.left,
        y: (edge === "top" ? r.top : r.bottom) - containerRect.top,
      };
    };

    const fromBottom = pointAt(fromEl, "bottom");
    const toTop = pointAt(toEl, "top");
    const lineSpacing = 7;

    const d = `
      M ${fromBottom.x - lineSpacing} ${fromBottom.y} L ${
      toTop.x - lineSpacing
    } ${toTop.y}
      M ${fromBottom.x} ${fromBottom.y} L ${toTop.x} ${toTop.y}
      M ${fromBottom.x + lineSpacing} ${fromBottom.y} L ${
      toTop.x + lineSpacing
    } ${toTop.y}
    `;

    setPerfConnector({
      width: containerRect.width,
      height: containerRect.height,
      d,
    });
  }, []);

  // --- Déclenchement de l'animation d'entrée au scroll ---
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (activeIndex !== 0) return;
    recomputeConnector();

    const raf = requestAnimationFrame(recomputeConnector);
    const container = slide1Ref.current;
    let resizeObserver;
    if (container && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => recomputeConnector());
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", recomputeConnector);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recomputeConnector);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeIndex, recomputeConnector]);

  useLayoutEffect(() => {
    if (activeIndex !== 1) return;
    recomputeBrandConnector();

    const raf = requestAnimationFrame(recomputeBrandConnector);
    const container = brandSlideRef.current;
    let resizeObserver;
    if (container && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => recomputeBrandConnector());
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", recomputeBrandConnector);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recomputeBrandConnector);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeIndex, recomputeBrandConnector]);

  useLayoutEffect(() => {
    if (activeIndex !== 2) return;
    recomputeContentConnector();

    const raf = requestAnimationFrame(recomputeContentConnector);
    const container = contentSlideRef.current;
    let resizeObserver;
    if (container && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => recomputeContentConnector());
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", recomputeContentConnector);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recomputeContentConnector);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeIndex, recomputeContentConnector]);

  // --- Slide 4 : effet de recalcul ---
  useLayoutEffect(() => {
    if (activeIndex !== 3) return;
    recomputePerfConnector();

    const raf = requestAnimationFrame(recomputePerfConnector);
    const container = perfSlideRef.current;
    let resizeObserver;
    if (container && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => recomputePerfConnector());
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", recomputePerfConnector);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recomputePerfConnector);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeIndex, recomputePerfConnector]);

  useEffect(() => {
    if (isPaused) return undefined;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activitiesData.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  const active = activitiesData[activeIndex];

  const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

  return (
    <section
      className={`activiter-section ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="activiter-aurora activiter-aurora--a" />
      <div className="activiter-aurora activiter-aurora--b" />

      <div className="activiter-container">
        <div className="activiter-row">
          {/* Colonne gauche */}
          <div className="activiter-col-left">
            <span className="activiter-eyebrow">Activités</span>
            <h2 className="activiter-title">
              Le contenu qui te fait grandir, pas juste publier.
            </h2>
            <p className="activiter-paragraph">
              Charlotte crée pour performer, pas juste pour "poster".
            </p>
            <button
              type="button"
              className="activiter-btn"
              onClick={() =>
                window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer")
              }
            >
              Commencer maintenant
              <span className="activiter-btn__arrow" aria-hidden="true">
                →
              </span>
            </button>

            <div
              className="activiter-cards-group"
              style={{
                "--active-index": activeIndex,
                "--accent": active.accent,
              }}
            >
              <span className="activiter-rail" aria-hidden="true">
                <span className="activiter-rail__dot" />
              </span>

              {activitiesData.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    type="button"
                    key={item.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className={`activiter-card ${isActive ? "is-active" : ""}`}
                    style={{ "--accent": item.accent }}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    aria-pressed={isActive}
                  >
                    <div className="activiter-card__content-wrapper">
                      <span className="activiter-card__icon">{item.icon}</span>
                      <div className="activiter-card__body">
                        <div className="activiter-card__head">
                          <h3 className="activiter-card__title">
                            {item.title}
                          </h3>
                        </div>
                        <p className="activiter-card__text">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <span className="activiter-card__progress">
                        <span
                          className="activiter-card__progress-bar"
                          style={{
                            animationDuration: `${AUTOPLAY_MS}ms`,
                            animationPlayState: isPaused ? "paused" : "running",
                          }}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="activiter-col-right">
            <div
              className="activiter-slide-panel"
              style={{ "--accent": active.accent }}
            >
              <span
                className="activiter-slide-panel__glow"
                aria-hidden="true"
              />
              {activitiesData.map((item, index) => {
                const isFirstCustom = item.id === 1 && item.slide.custom;
                const isBrandCustom = item.id === 2 && item.slide.brandCustom;
                const isContentCustom =
                  item.id === 3 && item.slide.contentPreview;
                const isPerfCustom =
                  item.id === 4 && item.slide.performanceCustom;

                return (
                  <article
                    key={item.id}
                    ref={
                      isFirstCustom
                        ? slide1Ref
                        : isBrandCustom
                        ? brandSlideRef
                        : isContentCustom
                        ? contentSlideRef
                        : isPerfCustom
                        ? perfSlideRef
                        : null
                    }
                    className={`activiter-slide ${
                      activeIndex === index ? "is-active" : ""
                    } ${
                      item.slide.custom ||
                      item.slide.brandCustom ||
                      item.slide.contentPreview ||
                      item.slide.performanceCustom
                        ? "activiter-slide--custom"
                        : ""
                    }`}
                    style={{ "--accent": item.accent }}
                    aria-hidden={activeIndex !== index}
                  >
                    {isFirstCustom ? (
                      <>
                        {connector && (
                          <svg
                            className="activiter-slide__connector"
                            width={connector.width}
                            height={connector.height}
                            viewBox={`0 0 ${connector.width} ${connector.height}`}
                            aria-hidden="true"
                          >
                            <path
                              className="activiter-slide__connector-line"
                              d={connector.d}
                            />
                          </svg>
                        )}

                        <button
                          type="button"
                          className="activiter-slide__button"
                          ref={btnRef}
                        >
                          {item.slide.custom.button}
                        </button>

                        <div className="activiter-slide__cards-row">
                          {item.slide.custom.topCards.map((card, cardIndex) => {
                            const isCenter = card.title === CENTER_CARD_TITLE;
                            return (
                              <div
                                className={`activiter-slide__mini-card ${
                                  isCenter ? "is-center-dna" : ""
                                }`}
                                key={`top-${cardIndex}`}
                                ref={(el) =>
                                  (topCardRefs.current[cardIndex] = el)
                                }
                              >
                                <span className="activiter-slide__mini-card-icon">
                                  {card.icon}
                                </span>
                                <p className="activiter-slide__mini-card-title">
                                  {card.title}
                                </p>
                                {card.text && (
                                  <p className="activiter-slide__mini-card-text">
                                    {card.text}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="activiter-slide__image-row">
                          {item.slide.custom.images.map((img, imgIndex) => (
                            <div
                              className="activiter-slide__image-box"
                              key={`img-${imgIndex}`}
                              ref={(el) => (imageRefs.current[imgIndex] = el)}
                            >
                              <img
                                src={img.src}
                                alt={img.alt}
                                className="activiter-slide__image"
                                onLoad={recomputeConnector}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    ) : isBrandCustom ? (
                      <>
                        {brandConnector && (
                          <svg
                            className="activiter-brand__connector"
                            width={brandConnector.width}
                            height={brandConnector.height}
                            viewBox={`0 0 ${brandConnector.width} ${brandConnector.height}`}
                            aria-hidden="true"
                          >
                            <path
                              className="activiter-brand__connector-line"
                              d={brandConnector.d}
                            />
                          </svg>
                        )}

                        <label
                          className="activiter-brand__label"
                          htmlFor="agent-website-url"
                        >
                          {item.slide.brandCustom.urlLabel}
                        </label>
                        <div
                          className="activiter-brand__input-wrapper"
                          ref={brandInputRef}
                        >
                          <Globe
                            size={16}
                            strokeWidth={2}
                            className="activiter-brand__input-icon"
                            aria-hidden="true"
                          />
                          <input
                            id="agent-website-url"
                            type="text"
                            className="activiter-brand__input"
                            placeholder={item.slide.brandCustom.urlPlaceholder}
                            disabled
                            readOnly
                          />
                        </div>

                        <button
                          type="button"
                          className="activiter-slide__button activiter-brand__generate-btn"
                          ref={brandBtnRef}
                        >
                          {item.slide.brandCustom.generateLabel}
                        </button>

                        <div className="activiter-brand__row">
                          <div
                            className="activiter-brand__card"
                            ref={(el) => (brandCardRefs.current[0] = el)}
                          >
                            <h4 className="activiter-brand__card-title">
                              Brand colors
                            </h4>
                            <div className="activiter-brand__swatches">
                              {item.slide.brandCustom.brandColors.map(
                                (color) => (
                                  <span
                                    key={color}
                                    className="activiter-brand__swatch"
                                    style={{ backgroundColor: color }}
                                    aria-label={color}
                                  />
                                )
                              )}
                            </div>
                          </div>

                          <div
                            className="activiter-brand__card"
                            ref={(el) => (brandCardRefs.current[1] = el)}
                          >
                            <h4 className="activiter-brand__card-title">
                              Logo
                            </h4>
                            <div className="activiter-brand__logo">
                              <img
                                src={item.slide.brandCustom.logo}
                                alt="Logo de votre marque"
                                className="activiter-brand__logo-img"
                                onLoad={recomputeBrandConnector}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="activiter-brand__row">
                          <div className="activiter-brand__card">
                            <h4 className="activiter-brand__card-title">
                              Typographie
                            </h4>
                            <p className="activiter-brand__card-text">
                              {item.slide.brandCustom.typography}
                            </p>
                          </div>

                          <div className="activiter-brand__card">
                            <h4 className="activiter-brand__card-title">
                              Style
                            </h4>
                            <p className="activiter-brand__card-text">
                              {item.slide.brandCustom.style}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : isContentCustom ? (
                      <>
                        {contentConnector && (
                          <svg
                            className="activiter-brand__connector"
                            width={contentConnector.width}
                            height={contentConnector.height}
                            viewBox={`0 0 ${contentConnector.width} ${contentConnector.height}`}
                            aria-hidden="true"
                          >
                            <path
                              className="activiter-brand__connector-line"
                              d={contentConnector.d}
                            />
                          </svg>
                        )}

                        <div className="activiter-content__image-wrapper">
                          <img
                            src={item.slide.contentPreview.image}
                            alt="Aperçu du contenu généré"
                            className="activiter-content__image"
                          />
                        </div>

                        <div
                          className="activiter-content__card"
                          ref={contentCardRef}
                        >
                          <div className="activiter-content__status-row">
                            <span className="activiter-content__status-label">
                              {item.slide.contentPreview.statusLabel}
                            </span>
                            <span className="activiter-content__status-text">
                              {item.slide.contentPreview.statusText}
                              <span
                                className="activiter-content__loading-dots"
                                aria-hidden="true"
                              >
                                <span />
                                <span />
                                <span />
                              </span>
                            </span>
                          </div>

                          <p className="activiter-content__description">
                            {item.slide.contentPreview.description}
                          </p>

                          <a href="#" className="activiter-content__link">
                            {item.slide.contentPreview.linkText}
                            <span aria-hidden="true">→</span>
                          </a>
                        </div>

                        <div className="activiter-content__publish-row">
                          <div className="activiter-content__icon-col">
                            <span className="activiter-content__icon-box">
                              <FaInstagram
                                size={17}
                                color="#E1306C"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="activiter-content__icon-box">
                              <FaLinkedin
                                size={17}
                                color="#0A66C2"
                                aria-hidden="true"
                              />
                            </span>
                          </div>

                          <div className="activiter-content__publish-col">
                            <button
                              type="button"
                              className="activiter-slide__button"
                              ref={contentBtnRef}
                            >
                              {item.slide.contentPreview.publishLabel}
                            </button>
                          </div>

                          <div className="activiter-content__icon-col">
                            <span className="activiter-content__icon-box">
                              <FaYoutube
                                size={17}
                                color="#FF0000"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="activiter-content__icon-box">
                              <FaTiktok
                                size={16}
                                color="#25F4EE"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </div>
                      </>
                    ) : isPerfCustom ? (
                      <>
                        {perfConnector && (
                          <svg
                            className="activiter-brand__connector"
                            width={perfConnector.width}
                            height={perfConnector.height}
                            viewBox={`0 0 ${perfConnector.width} ${perfConnector.height}`}
                            aria-hidden="true"
                          >
                            <path
                              className="activiter-brand__connector-line"
                              d={perfConnector.d}
                            />
                          </svg>
                        )}

                        <div className="activiter-content__image-wrapper">
                          <img
                            src={item.slide.performanceCustom.image}
                            alt="Aperçu de la performance des créatives"
                            className="activiter-content__image"
                          />
                        </div>

                        <div
                          className="activiter-perf__enrich-card"
                          ref={perfEnrichCardRef}
                        >
                          <span className="activiter-perf__enrich-text">
                            {item.slide.performanceCustom.enrichText}
                          </span>
                          <span className="activiter-perf__enrich-logo-wrapper">
                            <svg
                              className="activiter-perf__enrich-ring"
                              viewBox="0 0 40 40"
                              aria-hidden="true"
                            >
                              <circle
                                className="activiter-perf__enrich-ring-track"
                                cx="20"
                                cy="20"
                                r="17"
                              />
                              <circle
                                className="activiter-perf__enrich-ring-progress"
                                cx="20"
                                cy="20"
                                r="17"
                              />
                            </svg>
                            <img
                              src={item.slide.performanceCustom.enrichLogo}
                              alt="Logo de votre marque"
                              className="activiter-perf__enrich-logo"
                            />
                          </span>
                        </div>

                        <div
                          className="activiter-perf__chart-card"
                          ref={perfChartCardRef}
                        >
                          <div className="activiter-perf__chart-header">
                            <h4 className="activiter-perf__chart-title">
                              {item.slide.performanceCustom.chartTitle}
                            </h4>
                            <span className="activiter-perf__chart-period">
                              {item.slide.performanceCustom.chartPeriod}
                            </span>
                          </div>

                          <svg
                            className="activiter-perf__chart"
                            viewBox="0 0 300 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <defs>
                              <linearGradient
                                id="perfChartGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor={
                                    item.slide.performanceCustom.chartColor
                                  }
                                  stopOpacity="0.45"
                                />
                                <stop
                                  offset="100%"
                                  stopColor={
                                    item.slide.performanceCustom.chartColor
                                  }
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>
                            <path
                              d="M0,85 C 30,80 45,70 60,68 C 80,65 95,50 115,48 C 140,45 155,55 175,50 C 200,44 215,20 235,15 C 255,10 275,18 300,5 L300,100 L0,100 Z"
                              fill="url(#perfChartGradient)"
                            />
                            <path
                              d="M0,85 C 30,80 45,70 60,68 C 80,65 95,50 115,48 C 140,45 155,55 175,50 C 200,44 215,20 235,15 C 255,10 275,18 300,5"
                              fill="none"
                              stroke={item.slide.performanceCustom.chartColor}
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="activiter-perf__chart-line"
                            />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <>
                        <span
                          className="activiter-slide__ghost-icon"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                        <h3 className="activiter-slide__heading">
                          {item.slide.heading}
                        </h3>
                        <p className="activiter-slide__text">
                          {item.slide.text}
                        </p>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}