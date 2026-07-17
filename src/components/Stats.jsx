import { useEffect, useRef, useState } from "react";
import { Globe, Smartphone, Rocket } from "lucide-react";

import PropTypes from "prop-types";
import imageSrc from "../assets/icon-center.webp";
import ResultatStat from "./Resultatstat";
import Revolution from "./Revolution";

import imageStat from "../assets/icon-stat.webp";
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

function Stats({ title }) {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.5 });

  return (
    <div className="background-stat">
      <section
        className={`section-stat ${
          isInView ? "section-stat--visible" : ""
        }`.trim()}
        ref={sectionRef}
      >
        <img className="badge-image" src={imageSrc} alt="Icone Avenir Tech" />
        <div className="container-stat">
          <div className="row-stat">
            <h1 className="title">{title}</h1>
          </div>
        </div>
      </section>
      <ResultatStat
        imageSrc={imageStat}
        imageAlt="Logo Avenir Tech"
        stats={[
          {
            id: 1,
            Icon: Globe,
            value: "50+",
            color: "#03cf90",
          },
          { id: 2, Icon: Smartphone, value: "100%", color: "#6acad6" },
          { id: 3, Icon: Rocket, value: "5", color: "#03cf90" },
        ]}
        animate={isInView}
      />

      <Revolution />
    </div>
  );
}

Stats.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
};

Stats.defaultProps = {
  imageAlt: "",
};

export default Stats;