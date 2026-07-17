import { useEffect, useRef, useState } from "react";
import BoutonComponent from "./Bouton";
import ModalContact from "./ModalContact" 
import revolutionImage from "../assets/revolution-image.webp";
import "../styles/Revolution.css";

function useInViewOnce(options = { threshold: 0.5 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

const Revolution = () => {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.5 });
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section
      className={`revolution-section ${
        isInView ? "revolution-section--visible" : ""
      }`.trim()}
      ref={sectionRef}
      id="tarifs"
    >
      <div className="revolution-container">
        <div className="revolution-row">
          {/* Colonne Gauche */}
          <div className="revolution-col revolution-col-left">
            <h2 className="revolution-title">La Révolution Digitale</h2>
            <p className="revolution-text">
              Transformez vos idées en solutions innovantes. Notre approche
              allie performance technique et design utilisateur pour propulser
              votre activité vers de nouveaux sommets.
            </p>
            <BoutonComponent
              text="Commencer"
              onClick={() => setIsContactOpen(true)}
            />
          </div>

          {/* Colonne Droite */}
          <div className="revolution-col revolution-col-right">
            <div className="revolution-image-wrapper">
              <img
                src={revolutionImage}
                alt="Illustration de la révolution digitale"
                className="revolution-image"
              />
            </div>
          </div>
        </div>
      </div>

      <ModalContact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </section>
  );
};

export default Revolution;