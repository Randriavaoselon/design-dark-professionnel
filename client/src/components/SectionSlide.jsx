import { useState, useEffect, useRef } from 'react';
import '../styles/SectionSlide.css';

const cards = [
  {
    id: 1,
    title: 'Livraison rapide',
    text: 'De la maquette à la mise en ligne, nous livrons des sites web performants dans des délais courts et maîtrisés.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Sécurité renforcée',
    text: 'Certificat SSL, hébergement fiable et bonnes pratiques de sécurité intégrés à chaque site que nous livrons.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
        <path d="M9.5 12l1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Suivi de projet transparent',
    text: 'Suivez l\'avancement de votre site à chaque étape, avec des points de validation clairs jusqu\'à la mise en ligne.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19V9M12 19V5M20 19v-6" strokeLinecap="round" />
        <path d="M4 19h16" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Support dédié',
    text: 'Une équipe disponible avant, pendant et après la mise en ligne pour répondre à vos besoins et faire évoluer votre site.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 12a8 8 0 1116 0" strokeLinecap="round" />
        <rect x="2.5" y="12" width="4" height="6" rx="1.2" />
        <rect x="17.5" y="12" width="4" height="6" rx="1.2" />
      </svg>
    )
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
                <div className="section-slide__icon">{card.icon}</div>
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