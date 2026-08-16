import { useEffect, useRef, useState } from "react";
import worksListImage from "../assets/works-list-image.webp";
import "../styles/WorksList.css";

const WorksList = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`works-list-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="works-list-container">
        <div className="works-list-image-wrapper">
          <img
            src={worksListImage}
            alt="Aperçu de notre méthode de travail"
            className="works-list-image"
          />
        </div>
      </div>
    </section>
  );
};

export default WorksList;