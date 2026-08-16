import { useState, useLayoutEffect, useRef, useCallback } from "react";
import cerveauCore from "../../assets/agents/charlotte-performance.webp";
import "../../styles/agents/PotentielDescription.css";

const leftCards = [
  {
    icon: "🎨",
    title: "ADN de marque",
    text: "Ton, style, valeurs, charte,...",
  },
  {
    icon: "💼",
    title: "Connaissances business",
    text: "Votre offre, vos process et votre marché, compris et exploités automatiquement.",
  },
  {
    icon: "🧠",
    title: "Mémoire intelligente",
    text: "Chaque échange enrichit durablement la mémoire partagée de vos agents.",
  },
];

const rightCards = [
  {
    icon: "🔌",
    title: "Connexions outils",
    text: "Synchronisé avec vos outils existants pour agir sans rupture de contexte.",
  },
  {
    icon: "📊",
    title: "Insights & analyses",
    text: "Des signaux exploités en continu pour affiner chaque recommandation.",
  },
  {
    icon: "🌐",
    title: "Intelligence partagée",
    text: "Ce qu'apprend un agent profite instantanément à tous les autres.",
  },
];

export default function PotentielDescription() {
  const rowRef = useRef(null);
  const coreRef = useRef(null);
  const leftCardRefs = useRef([]);
  const rightCardRefs = useRef([]);

  const [leftPaths, setLeftPaths] = useState([]);
  const [rightPaths, setRightPaths] = useState([]);
  const [svgSize, setSvgSize] = useState(null);

  const recomputeConnectors = useCallback(() => {
    const row = rowRef.current;
    const core = coreRef.current;
    const lefts = leftCardRefs.current;
    const rights = rightCardRefs.current;

    if (
      !row ||
      !core ||
      lefts.length < 3 ||
      rights.length < 3 ||
      lefts.some((c) => !c) ||
      rights.some((c) => !c)
    ) {
      return;
    }

    const rowRect = row.getBoundingClientRect();
    const coreRect = core.getBoundingClientRect();

    const pointAt = (el, side) => {
      const r = el.getBoundingClientRect();
      return {
        x: (side === "right" ? r.right : r.left) - rowRect.left,
        y: r.top + r.height / 2 - rowRect.top,
      };
    };

    // Trois points d'ancrage sur le bord gauche / droit du noyau central
    const coreAnchor = (side, ratio) => ({
      x: (side === "left" ? coreRect.left : coreRect.right) - rowRect.left,
      y: coreRect.top - rowRect.top + coreRect.height * ratio,
    });

    const leftAnchors = [
      coreAnchor("left", 0.2), // vers la card du haut
      coreAnchor("left", 0.5), // vers la card du milieu
      coreAnchor("left", 0.8), // vers la card du bas
    ];

    const rightAnchors = [
      coreAnchor("right", 0.2),
      coreAnchor("right", 0.5),
      coreAnchor("right", 0.8),
    ];

    const organicCurve = (from, to, dir) => {
      // dir : 1 = courbe vers la droite (côté gauche -> centre), -1 = vers la gauche (droite -> centre)
      const dx = Math.abs(to.x - from.x);
      const cx1 = from.x + dir * dx * 0.55;
      const cy1 = from.y;
      const cx2 = to.x - dir * dx * 0.35;
      const cy2 = to.y;
      return `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`;
    };

    const newLeftPaths = lefts.map((el, i) =>
      organicCurve(pointAt(el, "right"), leftAnchors[i], 1)
    );
    const newRightPaths = rights.map((el, i) =>
      organicCurve(pointAt(el, "left"), rightAnchors[i], -1)
    );

    setLeftPaths(newLeftPaths);
    setRightPaths(newRightPaths);
    setSvgSize({ width: rowRect.width, height: rowRect.height });
  }, []);

  useLayoutEffect(() => {
    recomputeConnectors();

    const raf = requestAnimationFrame(recomputeConnectors);
    const row = rowRef.current;
    let resizeObserver;
    if (row && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => recomputeConnectors());
      resizeObserver.observe(row);
    }
    window.addEventListener("resize", recomputeConnectors);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recomputeConnectors);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [recomputeConnectors]);

  return (
    <section className="potentiel-desc-section">
      <div className="potentiel-desc-aurora potentiel-desc-aurora--a" />
      <div className="potentiel-desc-aurora potentiel-desc-aurora--b" />

      <div className="potentiel-desc-container">
        <div className="potentiel-desc-row" ref={rowRef}>
          {svgSize && (
            <svg
              className="potentiel-desc-connectors"
              width={svgSize.width}
              height={svgSize.height}
              viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
              aria-hidden="true"
            >
              {leftPaths.map((d, i) => (
                <path key={`left-${i}`} className="potentiel-desc-connector-line" d={d} />
              ))}
              {rightPaths.map((d, i) => (
                <path key={`right-${i}`} className="potentiel-desc-connector-line" d={d} />
              ))}
            </svg>
          )}

          {/* Colonne gauche */}
          <div className="potentiel-desc-col potentiel-desc-col--left">
            {leftCards.map((card, i) => (
              <div
                className="potentiel-desc-card"
                key={card.title}
                ref={(el) => (leftCardRefs.current[i] = el)}
              >
                <div className="potentiel-desc-card__head">
                  <span className="potentiel-desc-card__icon">{card.icon}</span>
                  <h3 className="potentiel-desc-card__title">{card.title}</h3>
                </div>
                <p className="potentiel-desc-card__text">{card.text}</p>
              </div>
            ))}
          </div>

          {/* Colonne centrale */}
          <div className="potentiel-desc-col potentiel-desc-col--center">
            <div className="potentiel-desc-core" ref={coreRef}>
              <span className="potentiel-desc-core__glow" aria-hidden="true" />
              <img
                src={cerveauCore}
                alt="Cerveau IA au centre d'Agentova"
                className="potentiel-desc-core__image"
              />
              <span className="potentiel-desc-core__label">CERVEAU IA</span>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="potentiel-desc-col potentiel-desc-col--right">
            {rightCards.map((card, i) => (
              <div
                className="potentiel-desc-card"
                key={card.title}
                ref={(el) => (rightCardRefs.current[i] = el)}
              >
                <div className="potentiel-desc-card__head">
                  <span className="potentiel-desc-card__icon">{card.icon}</span>
                  <h3 className="potentiel-desc-card__title">{card.title}</h3>
                </div>
                <p className="potentiel-desc-card__text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}