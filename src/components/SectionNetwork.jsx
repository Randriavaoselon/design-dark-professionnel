import { useEffect, useRef, useState } from "react";
import BoutonComponent from "./Bouton";
import '../styles/SectionNetwork.css';

const SectionNetwork = () => {
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
      className={`section-network-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="section-network-container">
        <div className="section-network-row">
          <h2 className="section-network__title">
            Rejoignez notre réseau
          </h2>
          <p className="section-network__text">
            Connectez-vous à une communauté de partenaires et de talents
            engagés, prêts à collaborer sur des projets qui font la
            différence.
          </p>
          <BoutonComponent
            text="Commencer"
            onClick={() => console.log("Action déclenchée")}
            className="btn-works-network"
            href="/commencer"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionNetwork;