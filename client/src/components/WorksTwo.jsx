import { useEffect, useRef, useState } from "react";
import WorksList from "./WorksList";
import "../styles/WorksTwo.css";

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
            <h2 className="works-two__title">Notre méthode de travail</h2>
            <p className="works-two__text">
              Une démarche structurée en plusieurs étapes claires, pensée pour
              transformer vos idées en résultats concrets, avec transparence et
              rigueur à chaque phase du projet.
            </p>
          </div>
        </div>
      </section>

      <WorksList />
    </div>
  );
};

export default WorksTwo;