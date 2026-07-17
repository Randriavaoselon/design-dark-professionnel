import { useEffect, useRef, useState } from 'react';
import BoutonComponent from './Bouton';
import ModalContact from "./ModalContact"; 
import '../styles/OverviewTwo.css';
import overviewTwoImage from '../assets/overview-two.webp';

const OverviewTwo = () => {
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
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`overview-two-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="overview-two-container">
        <div className="overview-two-row">
          <div className="overview-two-col overview-two-col--image">
            <img
              src={overviewTwoImage}
              alt="Aperçu complémentaire de notre approche"
              className="overview-two-col__image"
            />
          </div>

          <div className="overview-two-col overview-two-col--content">
            <h2 className="overview-two-col__title">
              Un accompagnement pensé pour durer
            </h2>
            <p className="overview-two-col__text">
              Au-delà de la livraison initiale, nous assurons un suivi
              continu pour garantir la performance et l'évolution de vos
              projets dans le temps.
            </p>
            <BoutonComponent
              text="Commencer"
              onClick={() => setIsContactOpen(true)}
              className="btn-overview-two"
            />
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

export default OverviewTwo;