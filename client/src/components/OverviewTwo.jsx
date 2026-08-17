import { useEffect, useRef, useState } from 'react';
import BoutonComponent from './Bouton';
import { trackClick } from '../utils/trackClick';
import '../styles/OverviewTwo.css';
import overviewTwoImage from '../assets/overview-two.webp';

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

const OverviewTwo = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
              Des agents IA à l'image de votre entreprise
            </h2>
            <p className="overview-two-col__text">
              Ton, style, valeurs et positionnement, connaissances métier,
              mémoire des échanges, connexions à vos outils (WhatsApp,
              Instagram, Notion, CRM...) : chaque agent Agentova se
              personnalise entièrement pour coller à vos besoins réels.
            </p>
            <BoutonComponent
              text="Personnaliser mon agent IA"
              onClick={() => {
                trackClick("home-overview-two");
                window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer");
              }}
              className="btn-overview-two"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewTwo;