import { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import TachesRepetitives from "./TachesRepetitives";
import Revolution from "./Revolution";

import "../styles/Stats.css";

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

function Stats({ title, belowIconSrc, belowIconAlt }) {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.5 });

  return (
    <div className="background-stat">
      <section
        className={`section-stat ${
          isInView ? "section-stat--visible" : ""
        }`.trim()}
        ref={sectionRef}
      >
        <div className="container-stat">
          <div className="row-stat">
            <h1 className="title">{title}</h1>
          </div>
          <img
            className="title-below-icon"
            src={belowIconSrc}
            alt={belowIconAlt}
          />
        </div>
      </section>

      <TachesRepetitives/>

      <Revolution />
    </div>
  );
}

Stats.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  belowIconSrc: PropTypes.string,
  belowIconAlt: PropTypes.string,
};

Stats.defaultProps = {
  imageAlt: "",
  belowIconAlt: "",
};

export default Stats;