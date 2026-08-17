import { useEffect, useRef, useState } from 'react';
import BoutonComponent from './Bouton';
import { trackClick } from '../utils/trackClick';
import '../styles/Overview.css';
import overviewImage from '../assets/overview-image.webp';

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

const Overview = () => {
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
      className={`overview-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="overview-container">
        <div className="overview-row">
          <div className="overview-col overview-col--content">
            <h2 className="overview-col__title">
              Doublez votre productivité, comme Celesty
            </h2>
            <p className="overview-col__text">
              En automatisant les tâches répétitives, Celesty a économisé
              40 000€ de charges mensuelles tout en doublant sa productivité.
              Les agents d'Agentova structurent, organisent et vous aident à
              mieux décider au quotidien, pour libérer du temps et vous
              recentrer sur votre cœur de métier.
            </p>

            <BoutonComponent
              text="Booster ma productivité"
              onClick={() => {
                trackClick("home-overview");
                window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer");
              }}
              className="btn-overview"
            />
          </div>

          <div className="overview-col overview-col--image">
            <img
              src={overviewImage}
              alt="Vue d'ensemble de notre approche"
              className="overview-col__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;