import { useEffect, useRef, useState } from "react";
import BoutonComponent from "./Bouton";
import { ShieldCheck, Zap, LineChart, Layers } from "lucide-react";
import photoImage from "../assets/photo-solution.webp";
import "../styles/Solution.css";

const cards = [
  {
    icon: ShieldCheck,
    title: "Sites sécurisés",
    subtitle:
      "Certificat SSL et hébergement fiable inclus",
  },
  {
    icon: Zap,
    title: "Performance optimale",
    subtitle:
      "Chargement rapide, optimisé pour le SEO",
  },
  {
    icon: LineChart,
    title: "Visibilité accrue",
    subtitle:
      "Un design qui convertit vos visiteurs",
  },
  {
    icon: Layers,
    title: "Solution clé en main",
    subtitle:
      "Conception, hébergement et suivi inclus",
  },
];

export default function Solution() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -50% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`solution-section ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="solution-container">
        <div className="solution-row">
          {/* Colonne gauche : image */}
          <div className="solution-col-left">
            <img
              src={photoImage}
              alt="Illustration de la solution"
              className="solution-image"
            />
          </div>

          {/* Colonne droite : 4 cards + bouton */}
          <div className="solution-col-right">
            <div className="solution-cards-grid">
              {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    className="solution-card"
                    key={index}
                    style={{ "--card-delay": `${0.15 * index}s` }}
                  >
                    <div className="solution-card-icon-wrapper">
                      <Icon className="solution-card-icon" />
                    </div>
                    <h3 className="solution-card-title">{card.title}</h3>
                    <p className="solution-card-subtitle">{card.subtitle}</p>
                  </div>
                );
              })}
            </div>

            <BoutonComponent
              text="Commencer"
              onClick={() => console.log("Action déclenchée")}
              className="btn-solution"
              href="/commencer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
