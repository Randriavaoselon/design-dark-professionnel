import { useEffect, useRef, useState } from 'react';
import BoutonComponent from './Bouton';
import ModalContact from "./ModalContact";
import '../styles/Opportunity.css';
import opportunityImage from '../assets/opportunity-image.webp';

const Opportunity = () => {
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
              Chaque projet est une opportunité de croissance
            </h2>
            <p className="opportunity-col__text">
              Que vous lanciez votre activité ou souhaitiez moderniser votre
              présence en ligne, Avenir-Tech transforme votre vision en un
              site web performant, avec un accompagnement sur mesure à
              chaque étape.
            </p>
            <BoutonComponent
              text="Commencer"
              onClick={() => setIsContactOpen(true)}
              className="btn-oppotunity"
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

export default Opportunity;