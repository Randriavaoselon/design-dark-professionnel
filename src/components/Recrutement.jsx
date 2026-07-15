import { useEffect, useRef, useState } from "react";
import BoutonComponent from './Bouton';
import '../styles/Recrutement.css';
import imageRecruit from '../assets/image-recruite.webp'

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
            <h2 className="recrutement-title">Rejoignez notre équipe</h2>
            <p className="recrutement-paragraph">
              Nous recherchons des talents passionnés et rigoureux pour relever
              les défis technologiques de demain. Découvrez nos opportunités
              et construisez votre avenir avec nous.
            </p>
            <div className="recrutement-btn-wrapper">
              <BoutonComponent
                text="Voir les offres"
                href="/carrieres"
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