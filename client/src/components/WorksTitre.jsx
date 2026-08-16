import { useEffect, useRef, useState } from "react";
import "../styles/WorksTitre.css";

const Works = () => {
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
      className={`works-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="works-container">
        <div className="works-row">
          <p className="works-subtitle">POURQUOI CHOISIR NOS AGENTS IA</p>
          <h2 className="works-title">Automatisez jusqu'à 80% de vos tâches</h2>
        </div>
      </div>
    </section>
  );
};

export default Works;
