import { useEffect, useRef, useState } from "react";
import BoutonComponent from "./Bouton";
import imageCoop from "../assets/photo-coop.webp";
import "../styles/Cooptation.css";

const Cooptation = () => {
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
                alt="Cooptation professionnelle"
                className="cooptation-image"
              />
            </div>

            {/* Colonne Droite : Texte et bouton */}
            <div className="cooptation-col-text">
              <h2 className="cooptation-title">
                Rejoignez notre réseau de cooptation
              </h2>
              <p className="cooptation-paragraph">
                Partagez les talents de votre entourage et contribuez à
                construire des équipes d'exception. Votre implication est
                récompensée à chaque étape du processus.
              </p>
              <div className="cooptation-btn-wrapper">
                <BoutonComponent
                  text="Recommander un talent"
                  className="btn-cooptation"
                  href="/coopte"
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