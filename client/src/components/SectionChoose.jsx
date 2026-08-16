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
    <div className="background-section-choose" id="a-propos">
      <section
        ref={sectionRef}
        className={`section-choose ${isVisible ? "is-visible" : ""}`}
      >
        <div className="section-choose-container">
          <div className="section-choose-row">
            <div className="section-choose__col section-choose__col--left">
              <span className="section-choose__subtitle">
                Ils nous font confiance
              </span>
              <h2 className="section-choose__title">
                Des résultats concrets, racontés par nos clients
              </h2>
            </div>

            <div className="section-choose__col section-choose__col--right">
              <p className="section-choose__paragraph">
                Gain de temps, productivité en hausse, coûts réduits :
                d'agences à formateurs en passant par des indépendants, nos
                clients partagent les mêmes résultats depuis qu'ils utilisent
                Agentova. Découvrez leurs témoignages, dans leurs propres
                mots.
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