import { useEffect, useRef, useState } from 'react';
import { Zap, TrendingUp, SlidersHorizontal, PlugZap } from 'lucide-react';
import '../styles/WorkDetails.css';

const workItems = [
  {
    title: "Automatisation des tâches",
    desc: "Jusqu'à 80% des emails et tâches répétitives automatisés, pour gagner du temps.",
    icon: Zap,
    iconBg: "#1278f4"
  },
  {
    title: "Amélioration de la productivité",
    desc: "Une productivité augmentée de 82%, pour plus de chiffre d'affaires et de croissance.",
    icon: TrendingUp,
    iconBg: "#7208fe"
  },
  {
    title: "Personnalisation",
    desc: "Des agents adaptés aux besoins spécifiques de chaque entreprise.",
    icon: SlidersHorizontal,
    iconBg: "#e80497"
  },
  {
    title: "Intégration avec vos outils",
    desc: "Connectés à vos CRM, messageries et réseaux sociaux favoris.",
    icon: PlugZap,
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