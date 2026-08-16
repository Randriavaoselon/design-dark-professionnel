import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { XCircle } from 'lucide-react';
import '../styles/TachesRepetitives.css';

/* ==========================================================================
   Hook de révélation au scroll (identique au pattern utilisé dans
   ResultatStat : une seule fois, respecte prefers-reduced-motion)
   ========================================================================== */
function useInViewOnce(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
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

const ITEM_START_DELAY = 0.15;
const ITEM_STAGGER = 0.12;

const TACHES_PAR_DEFAUT = [
  {
    label: 'Répondre aux mêmes emails',
    description:
      "L'IA trie, priorise et rédige des réponses cohérentes avec votre ton, 24h/24.",
  },
  {
    label: 'Publier sur les réseaux sociaux',
    description:
      'Planification et calendrier éditorial automatisés : vos publications sortent au bon moment.',
  },
  {
    label: 'Chercher des prospects',
    description:
      'Un agent identifie et qualifie les leads correspondant à votre cible en continu.',
  },
  {
    label: 'Optimiser le SEO',
    description:
      'Suivi des positions et ajustements techniques pris en charge en continu, sans audit manuel.',
  },
  {
    label: 'Gérer le service client',
    description:
      "Un assistant répond aux questions fréquentes instantanément et n'escalade que si besoin.",
  },
];

/**
 * Grille de cartes présentant les tâches chronophages que l'automatisation
 * / l'IA prend en charge : icône, titre et description toujours visibles,
 * alignées horizontalement (5 cartes en ligne sur desktop).
 */
function TachesRepetitives({
  title = '',
  subtitle = '',
  taches = TACHES_PAR_DEFAUT,
}) {
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.2 });

  return (
    <section
      className={`taches-repetitives ${isInView ? 'taches-repetitives--visible' : ''}`.trim()}
      ref={sectionRef}
    >
      <div className="taches-repetitives__container">
        {title && <h2 className="taches-repetitives__title">{title}</h2>}
        {subtitle && <p className="taches-repetitives__subtitle">{subtitle}</p>}

        <ul className="taches-repetitives__list">
          {taches.map((tache, index) => {
            const delay = ITEM_START_DELAY + index * ITEM_STAGGER;

            return (
              <li
                className="taches-repetitives__item"
                key={tache.label}
                style={{ transitionDelay: `${delay}s` }}
              >
                <span
                  className="taches-repetitives__icon"
                  style={{ transitionDelay: `${delay}s` }}
                  aria-hidden="true"
                >
                  <XCircle size={22} strokeWidth={2} />
                </span>
                <span
                  className="taches-repetitives__label"
                  style={{ transitionDelay: `${delay + 0.1}s` }}
                >
                  {tache.label}
                </span>
                <p
                  className="taches-repetitives__description"
                  style={{ transitionDelay: `${delay + 0.18}s` }}
                >
                  {tache.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

TachesRepetitives.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  taches: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default TachesRepetitives;