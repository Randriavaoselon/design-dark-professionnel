import { useEffect, useRef, useState } from 'react';
import BoutonComponent from './Bouton';
import ModalContact from "./ModalContact"; 
import '../styles/OverviewTree.css';
import overviewTreeImage from '../assets/overview-three.webp';

const OverviewTree = () => {
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
      className={`overview-tree-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="overview-tree-container">
        <div className="overview-tree-row">
          <div className="overview-tree-col overview-tree-col--content">
            <h2 className="overview-tree-col__title">
              Des résultats mesurables à chaque étape
            </h2>
            <p className="overview-tree-col__text">
              Chaque projet est suivi avec des indicateurs concrets pour
              s'assurer que les objectifs fixés se traduisent en résultats
              réels et durables.
            </p>
            <BoutonComponent
              text="Commencer"
              onClick={() => setIsContactOpen(true)}
              className="btn-overview-three"
            />
          </div>

          <div className="overview-tree-col overview-tree-col--image">
            <img
              src={overviewTreeImage}
              alt="Résultats mesurables de notre approche"
              className="overview-tree-col__image"
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

export default OverviewTree;