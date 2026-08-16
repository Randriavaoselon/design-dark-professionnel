import { useEffect, useRef, useState } from "react";
import "../styles/Simplify.css";

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
            <h2 className="simplify-title">Est-ce que ça fait trop robot ?</h2>
            <p className="simplify-paragraph">
              Les agents IA d'Agentova s'adaptent à votre ton et à votre façon
              de communiquer afin de produire des contenus naturels. Selon les
              témoignages des utilisateurs, les échanges paraissent authentiques
              et la différence avec une rédaction humaine est à peine
              perceptible.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Simplify;
