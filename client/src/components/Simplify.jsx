import { useEffect, useRef, useState } from "react";
import '../styles/Simplify.css';

const Simplify = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5, // déclenchement à 50% de visibilité
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        className={`simplify-section ${isVisible ? "is-visible" : ""}`}
        ref={sectionRef}
      >
        <div className="simplify-container">
          <div className="simplify-row">
            <h2 className="simplify-title">Simplifiez votre présence en ligne</h2>
            <p className="simplify-paragraph">
              Avenir-Tech transforme vos idées en un site web clair et
              efficace. De la conception à la mise en ligne, nous simplifions
              chaque étape pour vous offrir une expérience fluide, sans
              complexité technique de votre côté.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Simplify;