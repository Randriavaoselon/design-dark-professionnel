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
            <h2 className="simplify-title">Simplify Your Workflow</h2>
            <p className="simplify-paragraph">
              Nous transformons la complexité en simplicité. Notre mission est
              d'optimiser vos processus pour une productivité accrue et une
              expérience utilisateur fluide.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Simplify;