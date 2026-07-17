import { useEffect, useRef, useState } from "react";
import BoutonComponent from "./Bouton";
import ModalContact from "./ModalContact";
import imageCoop from "../assets/photo-coop.webp";
import "../styles/Cooptation.css";

const Cooptation = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

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
                alt="Programme de parrainage Avenir Tech"
                className="cooptation-image"
              />
            </div>

            {/* Colonne Droite : Texte et bouton */}
            <div className="cooptation-col-text">
              <h2 className="cooptation-title">
                Recommandez-nous, gagnez des avantages
              </h2>
              <p className="cooptation-paragraph">
                Vous connaissez quelqu'un qui a besoin d'un site web ?
                Parrainez-le auprès d'Avenir Tech et bénéficiez d'une réduction
                sur votre prochaine prestation, valable dès la signature de son
                projet.
              </p>
              <div className="cooptation-btn-wrapper">
                <BoutonComponent
                  text="Parrainer un contact"
                  className="btn-cooptation"
                  onClick={() => setIsContactOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModalContact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default Cooptation;