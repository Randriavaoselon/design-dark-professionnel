import { useEffect, useRef, useState } from 'react';
import BoutonComponent from './Bouton';
import '../styles/Overview.css';
import overviewImage from '../assets/overview-image.webp';

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
              Une vue d'ensemble de notre approche
            </h2>
            <p className="overview-col__text">
              Nous combinons expertise technique et sens du détail pour livrer
              des solutions adaptées à vos ambitions, du concept jusqu'au
              déploiement final.
            </p>

            <BoutonComponent
              text="Commencer"
              onClick={() => console.log("Action déclenchée")}
              className="btn-overview"
              href="/commencer"
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