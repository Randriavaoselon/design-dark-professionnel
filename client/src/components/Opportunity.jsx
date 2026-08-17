import { useEffect, useRef, useState } from 'react';
import BoutonComponent from './Bouton';
import { trackClick } from '../utils/trackClick';
import '../styles/Opportunity.css';
import opportunityImage from '../assets/opportunity-image.webp';

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

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
              Jusqu'à 35% de chiffre d'affaires en plus grâce à l'automatisation
            </h2>
            <p className="opportunity-col__text">
              Service client, création de contenu, gestion des réseaux
              sociaux, prospection, suivi des leads et administratif :
              Agentova automatise vos tâches du quotidien. Résultat pour nos
              utilisateurs : 80% d'emails automatisés, 40% de leads
              qualifiés et 45% de RDV bookés par mois.
            </p>
            <BoutonComponent
              text="Automatiser mon activité"
              onClick={() => {
                trackClick("home-opportunity");
                window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer");
              }}
              className="btn-oppotunity"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunity;