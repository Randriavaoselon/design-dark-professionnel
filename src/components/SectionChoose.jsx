import { useEffect, useRef, useState } from "react";
import SectionSlide from "./SectionSlide";
import FAQS from "./FAQS";
import "../styles/SectionChoose.css";

const SectionChoose = () => {
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
    <div className="background-section-choose">
      <section
        ref={sectionRef}
        className={`section-choose ${isVisible ? "is-visible" : ""}`}
      >
        <div className="section-choose-container">
          <div className="section-choose-row">
            <div className="section-choose__col section-choose__col--left">
              <span className="section-choose__subtitle">
                Pourquoi nous choisir
              </span>
              <h2 className="section-choose__title">
                Une agence pensée pour votre réussite
              </h2>
            </div>

            <div className="section-choose__col section-choose__col--right">
              <p className="section-choose__paragraph">
                Avenir-Tech conçoit des sites web modernes, rapides et
                responsives, avec une approche simple, transparente et
                adaptée à vos réalités. Nous allions technologies actuelles
                et accompagnement humain pour donner à chaque entreprise les
                moyens d'avancer dans le monde numérique.
              </p>
            </div>
          </div>
        </div>
      </section>
      <SectionSlide/>
      <FAQS/>
    </div>
  );
};

export default SectionChoose;