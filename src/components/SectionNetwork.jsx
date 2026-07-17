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
            Parlons de votre projet
          </h2>
          <p className="section-network__text">
            Entreprises, indépendants ou startups : notre équipe vous
            accompagne pour donner vie à un site web à votre image et
            construire ensemble une présence en ligne qui fait la
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