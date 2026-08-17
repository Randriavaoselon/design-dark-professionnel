import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import BoutonComponent from "./Bouton";
import imageCoop from "../assets/photo-solution.gif";
import { trackClick } from "../utils/trackClick";
import "../styles/Cooptation.css";

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

const faqItems = [
  {
    question: "ADN de marque",
    answer:
      "Définissez votre ton, votre style, vos valeurs, votre charte et votre positionnement pour que chaque agent IA parle avec la voix de votre marque.",
  },
  {
    question: "Connaissances business",
    answer:
      "Renseignez vos offres, vos cibles, vos process et vos objectifs pour que les agents comprennent parfaitement votre activité.",
  },
  {
    question: "Mémoire intelligente",
    answer:
      "Vos conversations, décisions et préférences sont stockées automatiquement, pour un suivi cohérent dans le temps.",
  },
  {
    question: "Intégrations favorites",
    answer:
      "Connectez WhatsApp, Instagram, Notion, votre CRM et bien d'autres outils déjà utilisés par votre équipe.",
  },
  {
    question: "Insights & analyses",
    answer:
      "Obtenez des données claires sur vos performances et identifiez de nouvelles opportunités en temps réel.",
  },
  {
    question: "Intelligence partagée",
    answer:
      "Activez l'apprentissage collectif : les agents progressent ensemble et améliorent continuellement leurs résultats.",
  },
];

const Cooptation = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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
        threshold: 0.5,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div>
      <section
        className={`cooptation-section ${isVisible ? "is-visible" : ""}`}
        ref={sectionRef}
      >
        <div className="cooptation-container">
          <div className="cooptation-row">
            {/* Colonne Gauche : Image */}
            <div className="cooptation-col-img">
              <img
                src={imageCoop}
                alt="Programme de parrainage Avenir Tech"
                className="cooptation-image"
              />
            </div>

            {/* Colonne Droite : Texte, FAQ et bouton */}
            <div className="cooptation-col-text">
              <h2 className="cooptation-title">
                Comment fonctionne Agentova ?
              </h2>
              <p className="cooptation-paragraph">
               
              </p>

              <div className="cooptation-faq">
                {faqItems.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  const delay = 0.45 + index * 0.08;
                  const panelId = `cooptation-faq-panel-${index}`;

                  return (
                    <div
                      className={`cooptation-faq__item${
                        isOpen ? " cooptation-faq__item--open" : ""
                      }`}
                      key={item.question}
                      style={{ transitionDelay: `${delay}s` }}
                    >
                      <button
                        type="button"
                        className="cooptation-faq__header"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <span className="cooptation-faq__question">
                          {item.question}
                        </span>
                        <ChevronDown
                          className="cooptation-faq__chevron"
                          size={18}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </button>

                      <div className="cooptation-faq__panel" id={panelId}>
                        <div className="cooptation-faq__panel-inner">
                          <p className="cooptation-faq__answer">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cooptation-btn-wrapper">
                <BoutonComponent
                  text="Découvrir Agentova"
                  className="btn-cooptation"
                  onClick={() => {
                    trackClick("cooptation");
                    window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cooptation;