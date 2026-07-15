import { useEffect, useRef, useState } from "react";
import Solution from "./Solution";
import "../styles/SolutionTitre.css";

/**
 * Déclenche `true` une seule fois quand au moins 50% de la section
 * est visible dans le viewport. Respecte prefers-reduced-motion.
 */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      >
        <div className="solution-titre-container">
          <div className="solution-titre-row">
            <h2 className="solution-titre-title">
              A TESTED AND APPROVED SOLUTION
            </h2>
            <p className="solution-titre-subtitle">
              Découvrez comment notre approche éprouvée garantit des résultats
              concrets et une fiabilité maximale pour vos projets.
            </p>
          </div>
        </div>
      </section>

      <Solution />
    </>
  );
};

export default SolutionTitre;