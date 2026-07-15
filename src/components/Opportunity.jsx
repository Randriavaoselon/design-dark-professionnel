import { useEffect, useRef, useState } from 'react';
import BoutonComponent from './Bouton';
import '../styles/Opportunity.css';
import opportunityImage from '../assets/opportunity-image.webp';

const Opportunity = () => {
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
      className={`opportunity-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="opportunity-container">
        <div className="opportunity-row">
          <div className="opportunity-col opportunity-col--image">
            <img
              src={opportunityImage}
              alt="Opportunité de collaboration"
              className="opportunity-col__image"
            />
          </div>

          <div className="opportunity-col opportunity-col--content">
            <h2 className="opportunity-col__title">
              Saisissez chaque opportunité
            </h2>
            <p className="opportunity-col__text">
              Rejoignez une communauté de professionnels engagés et transformez
              vos idées en projets concrets grâce à un accompagnement sur mesure.
            </p>
            <BoutonComponent
              text="Commencer"
              onClick={() => console.log("Action déclenchée")}
              className="btn-oppotunity"
              href="/commencer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunity;