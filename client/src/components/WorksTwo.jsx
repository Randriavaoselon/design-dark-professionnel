import { useEffect, useRef, useState } from "react";
import WorksList from "./WorksList";
import BoutonComponent from "./Bouton";
import "../styles/WorksTwo.css";

const DOWNLOAD_LINK = "https://www.agentova.ai/download";

const WorksTwo = () => {
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
    <div className="background-works-two-section">
      <section
        ref={sectionRef}
        className={`works-two-section ${isVisible ? "is-visible" : ""}`}
      >
        <div className="works-two-container">
          <div className="works-two-row">
            <h2 className="works-two__title">Vos agents IA dans votre poche</h2>
            <p className="works-two__text">
              Avec l'App Mobile Agentova, pilotez vos agents IA depuis n'importe
              où : validez une réponse de Margot dans le métro, jetez un œil aux
              leads qualifiés par Arthur entre deux rendez-vous. Téléchargeable
              directement depuis notre site web.
            </p>

            <BoutonComponent
              text="Télécharger l'application"
              onClick={() =>
                window.open(DOWNLOAD_LINK, "_blank", "noopener,noreferrer")
              }
              className="btn-works-list"
            />
          </div>
        </div>
      </section>

      <WorksList />
    </div>
  );
};

export default WorksTwo;