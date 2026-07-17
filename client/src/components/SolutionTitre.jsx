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
      >
        <div className="solution-titre-container">
          <div className="solution-titre-row">
            <h2 className="solution-titre-title">
              UNE EXPERTISE WEB À VOTRE SERVICE
            </h2>
            <p className="solution-titre-subtitle">
              Depuis notre création, Avenir Tech accompagne entreprises et
              entrepreneurs dans la création de sites web modernes, responsives
              et professionnels — pensés pour convertir vos visiteurs en
              clients.
            </p>
          </div>
        </div>
      </section>

      <Solution />
    </>
  );
};

export default SolutionTitre;
