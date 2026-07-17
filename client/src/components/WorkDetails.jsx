import { useEffect, useRef, useState } from 'react';
import { Target, Code2, Palette, Wrench } from 'lucide-react';
import '../styles/WorkDetails.css';

const workItems = [
  {
    title: "Stratégie",
    desc: "Analyse approfondie pour définir vos objectifs clairs.",
    icon: Target,
    iconBg: "#1278f4"
  },
  {
    title: "Développement",
    desc: "Création de solutions web performantes et évolutives.",
    icon: Code2,
    iconBg: "#7208fe"
  },
  {
    title: "Design UI/UX",
    desc: "Interfaces intuitives centrées sur l'utilisateur.",
    icon: Palette,
    iconBg: "#e80497"
  },
  {
    title: "Maintenance",
    desc: "Suivi technique et optimisation continue de vos outils.",
    icon: Wrench,
    iconBg: "#fc855b"
  }
];

const WorkDetails = () => {
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
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`work-details-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="work-details-container">
        <div className="work-details-row">
          <div className="work-details__grid">
            {workItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="detail-card"
                  style={{ '--card-icon-bg': item.iconBg, '--card-index': index }}
                >
                  <div className="detail-card__icon">
                    <Icon size={24} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="detail-card__title">{item.title}</h3>
                  <p className="detail-card__text">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkDetails;