import { useEffect, useRef, useState } from "react";
import BoutonComponent from "./Bouton";
import "../styles/Recrutement.css";
import imageRecruit from "../assets/image-recruite.webp";

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

const Recrutement = () => {
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
        threshold: 0.5,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`recrutement-section ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="recrutement-container">
        <div className="recrutement-row">
          {/* Colonne Gauche : Texte et Bouton */}
          <div className="recrutement-col-text">
            <h2 className="recrutement-title">
              Votre entreprise évolue, Agentova apprend avec elle
            </h2>
            <p className="recrutement-paragraph">
              À mesure que vous utilisez la plateforme, le Cerveau IA enrichit
              sa compréhension de votre activité. Vos agents deviennent plus
              performants, plus pertinents et vous accompagnent durablement dans
              l'automatisation de vos processus et le développement de votre
              entreprise.
            </p>
            <div className="recrutement-btn-wrapper">
              <BoutonComponent
                text="Commencer l'essai gratuit"
                onClick={() =>
                  window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer")
                }
              />
            </div>
          </div>

          {/* Colonne Droite : Image */}
          <div className="recrutement-col-img">
            <img
              src={imageRecruit}
              alt="Recrutement"
              className="recrutement-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recrutement;