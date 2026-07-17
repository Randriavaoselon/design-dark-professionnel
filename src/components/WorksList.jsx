import { useEffect, useRef, useState } from "react";
import { Target, Code2, Palette, Wrench, Rocket } from "lucide-react";
import BoutonComponent from "./Bouton";
import ModalContact from "./ModalContact";
import "../styles/WorksList.css";

const leftItems = [
  { icon: Target, title: "Analyse", desc: "Étude des besoins et objectifs." },
  {
    icon: Code2,
    title: "Développement",
    desc: "Construction technique du projet.",
  },
  { icon: Palette, title: "Design", desc: "Interfaces claires et cohérentes." },
  { icon: Wrench, title: "Tests", desc: "Vérification et ajustements." },
  { icon: Rocket, title: "Déploiement", desc: "Mise en ligne et suivi." },
];

const rightItems = [
  {
    icon: Target,
    title: "Stratégie",
    desc: "Positionnement et priorités clés.",
  },
  {
    icon: Code2,
    title: "Intégration",
    desc: "Connexion des outils existants.",
  },
  {
    icon: Palette,
    title: "Expérience",
    desc: "Parcours utilisateur optimisé.",
  },
  { icon: Wrench, title: "Optimisation", desc: "Performance et fiabilité." },
  { icon: Rocket, title: "Croissance", desc: "Évolution continue du produit." },
];

const WorksList = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`works-list-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="works-list-container">
        <div className="works-list-row">
          <div className="works-list-col works-list-col--left">
            <h3 className="works-list-col__subtitle">Ce que nous faisons</h3>
            <div className="works-list-col__cards">
              {leftItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="works-list-card"
                    style={{ "--card-index": index }}
                  >
                    <div className="works-list-card__header">
                      <Icon
                        size={18}
                        strokeWidth={2}
                        className="works-list-card__icon"
                        aria-hidden="true"
                      />
                      <h4 className="works-list-card__title">{item.title}</h4>
                    </div>
                    <p className="works-list-card__text">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="works-list-col works-list-col--right">
            <h3 className="works-list-col__subtitle">
              Comment nous le faisons
            </h3>
            <div className="works-list-col__cards">
              {rightItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="works-list-card"
                    style={{ "--card-index": index }}
                  >
                    <div className="works-list-card__header">
                      <h4 className="works-list-card__title">{item.title}</h4>
                      <Icon
                        size={18}
                        strokeWidth={2}
                        className="works-list-card__icon"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="works-list-card__text">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="works-list-cta">
          <BoutonComponent
            text="Commencer"
            onClick={() => setIsContactOpen(true)}
            className="btn-works-list"
          />
        </div>
      </div>

      <ModalContact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </section>
  );
};

export default WorksList;