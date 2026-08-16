import { useEffect, useRef, useState } from "react";
import Solution from "./Solution";
import "../styles/SolutionTitre.css";

function useInViewOnce(options = { threshold: 0.5 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

const SolutionTitre = () => {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.5 });

  return (
    <>
      <section
        className={`solution-titre-section ${
          isInView ? "solution-titre-section--visible" : ""
        }`.trim()}
        ref={sectionRef}
        id="demo"
      >
        <div className="solution-titre-container">
          <div className="solution-titre-row">
            <h2 className="solution-titre-title">
              Passez à la vitesse supérieure avec Agentova
            </h2>
            <p className="solution-titre-subtitle">
              Profitez d'une plateforme IA sécurisée, connectée à plus de 3 000
              applications, conçue pour faciliter la collaboration de vos
              équipes et optimiser votre productivité, avec un essai gratuit de
              7 jours, sans engagement.
            </p>
          </div>
        </div>
      </section>

      <Solution />
    </>
  );
};

export default SolutionTitre;
