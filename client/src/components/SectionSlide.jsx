import { useState, useEffect, useRef } from 'react';
import '../styles/SectionSlide.css';

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M7 8.5C5.3 8.5 4 9.9 4 11.6v1.9c0 1.7 1.3 3 3 3h.5v-3H6.5v-1.9c0-.6.4-1.1 1-1.1h.5V8.5H7z" />
    <path d="M15 8.5c-1.7 0-3 1.4-3 3.1v1.9c0 1.7 1.3 3 3 3h.5v-3h-1v-1.9c0-.6.4-1.1 1-1.1h.5V8.5H15z" />
  </svg>
);

const cards = [
  {
    id: 1,
    title: 'Client Agentova',
    text: 'Depuis 4 mois que j\'utilise Agentova, j\'ai gagné considérablement du temps. L\'évolution des agents IA est impressionnante.'
  },
  {
    id: 2,
    title: 'Xenesy Project',
    text: 'L\'évolution des agents IA d\'Agentova est impressionnante, et leur support client est réactif.'
  },
  {
    id: 3,
    title: 'Closer University',
    text: 'Nous avons automatisé notre agence grâce à l\'IA d\'Agentova, et réduit nos coûts tout en maintenant une qualité de service.'
  },
  {
    id: 4,
    title: 'Makers Coiffeur',
    text: 'Agentova a remplacé mon community manager, automatisé 80% de mes emails, et m\'a rendu ma famille.'
  },
  {
    id: 5,
    title: 'Mandyben Formation',
    text: 'Nous avons augmenté notre chiffre d\'affaires de 35% grâce à Agentova.'
  },
  {
    id: 6,
    title: 'Bullen Soi',
    text: 'Agentova m\'a aidée à passer de zéro client à un agenda complet, avec une croissance que je n\'imaginais pas atteindre si rapidement.'
  },
  {
    id: 7,
    title: 'Celesty',
    text: 'Nous avons économisé 40 000€ de charges mensuelles tout en doublant notre productivité grâce à Agentova.'
  }
];

const getVisibleCount = (width) => {
  if (width <= 760) return 1;
  if (width <= 900) return 2;
  return 3;
};

const SectionSlide = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    typeof window !== 'undefined' ? getVisibleCount(window.innerWidth) : 3
  );
  const [translateX, setTranslateX] = useState(0);

  const rowRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      const newCount = getVisibleCount(window.innerWidth);
      setVisibleCount((prev) => {
        if (prev !== newCount) {
          setActiveIndex(0);
          return newCount;
        }
        return prev;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(cards.length - visibleCount, 0);

  useEffect(() => {
    setActiveIndex((prev) => (prev > maxIndex ? maxIndex : prev));
  }, [maxIndex]);

  useEffect(() => {
    const updateOffset = () => {
      const target = cardRefs.current[activeIndex];
      if (target) {
        setTranslateX(target.offsetLeft);
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [activeIndex, visibleCount]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="section-slide">
      <div className="section-slide-container">
        <div className="section-slide__viewport">
          <div
            ref={rowRef}
            className="section-slide-row"
            style={{
              transform: `translateX(-${translateX}px)`,
              '--visible-count': visibleCount
            }}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="section-slide__card"
              >
                <div className="section-slide__icon">
                  <QuoteIcon />
                </div>
                <h3 className="section-slide__title">{card.title}</h3>
                <p className="section-slide__paragraph">{card.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-slide__controls">
          <button
            type="button"
            className="section-slide__control-btn"
            onClick={goPrev}
            aria-label="Slide précédent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="section-slide__control-btn"
            onClick={goNext}
            aria-label="Slide suivant"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionSlide;