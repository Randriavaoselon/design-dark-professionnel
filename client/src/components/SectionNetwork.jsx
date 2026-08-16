import { useEffect, useRef, useState } from "react";
import BoutonComponent from "./Bouton";
import '../styles/SectionNetwork.css';

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

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
      id="agents"
    >
      <div className="section-network-container">
        <div className="section-network-row">
          <h2 className="section-network__title">
            Une équipe d'agents IA, chacun avec sa personnalité
          </h2>
          <p className="section-network__text">
            Charlotte, créative et inspirante. Arthur, vendeur et
            convaincant. Margot, empathique et à l'écoute. Chaque agent
            Agentova a sa propre personnalité et sa façon de parler — vos
            clients ne remarquent même pas qu'ils échangent avec une IA.
          </p>
          <BoutonComponent
            text="Découvrir nos agents"
            onClick={() =>
              window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer")
            }
            className="btn-works-network"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionNetwork;