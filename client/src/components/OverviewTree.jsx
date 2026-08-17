import { useEffect, useRef, useState } from 'react';
import BoutonComponent from './Bouton';
import { trackClick } from '../utils/trackClick';
import '../styles/OverviewTree.css';
import overviewTreeImage from '../assets/overview-three.webp';

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

const OverviewTree = () => {
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
      className={`overview-tree-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="overview-tree-container">
        <div className="overview-tree-row">
          <div className="overview-tree-col overview-tree-col--content">
            <h2 className="overview-tree-col__title">
              Plus de 3 000 outils connectés, en quelques clics
            </h2>
            <p className="overview-tree-col__text">
              Notion, WhatsApp, Slack, CRM, messageries, réseaux sociaux,
              outils marketing, comptabilité : Agentova s'intègre à votre
              écosystème existant pour que vos agents passent directement à
              l'action. Résultat pour Sophie Rousseau : sa communauté
              LinkedIn se gère presque seule, avec un contenu cohérent, des
              visuels pros et une programmation automatique.
            </p>
            <BoutonComponent
              text="Connecter mes outils"
              onClick={() => {
                trackClick("home-overview-tree");
                window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer");
              }}
              className="btn-overview-three"
            />
          </div>

          <div className="overview-tree-col overview-tree-col--image">
            <img
              src={overviewTreeImage}
              alt="Résultats mesurables de notre approche"
              className="overview-tree-col__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewTree;