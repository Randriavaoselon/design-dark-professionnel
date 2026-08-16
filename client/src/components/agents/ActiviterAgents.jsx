import { useState, useEffect, useRef } from "react";
import "../../styles/agents/ActiviterAgent.css";

function ActiviterAgent({ activities = [] }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`activiter-ethan ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="activiter-ethan__container">
        <div className="activiter-ethan__row">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div className="activiter-ethan__col" key={index}>
                <div
                  className="activiter-ethan__card"
                  style={{ "--card-delay": `${index * 0.12}s` }}
                >
                  <span className="activiter-ethan__card-icon">
                    {Icon && <Icon size={22} strokeWidth={2} aria-hidden="true" />}
                  </span>
                  <h3 className="activiter-ethan__card-title">
                    {activity.title}
                  </h3>
                  <p className="activiter-ethan__card-description">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ActiviterAgent;