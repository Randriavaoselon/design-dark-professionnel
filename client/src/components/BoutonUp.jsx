import { useState, useEffect } from 'react';
import '../styles/BoutonUp.css';

const SCROLL_THRESHOLD = 300;

const BoutonUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={`bouton-up${isVisible ? ' bouton-up--visible' : ''}`}>
      <div className="bouton-up-container">
        <div className="bouton-up-row">
          <button
            type="button"
            className="bouton-up__btn"
            onClick={scrollToTop}
            aria-label="Remonter en haut de la page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BoutonUp;