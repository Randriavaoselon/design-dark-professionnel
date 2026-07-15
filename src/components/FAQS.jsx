import { useState, useEffect, useRef } from 'react';
import '../styles/FAQS.css';

const faqs = [
  { id: 1, question: 'Comment fonctionne Avenir-Tech ?', answer: 'Avenir-Tech met en relation talents et opportunités à travers une plateforme simple : créez votre profil, explorez les offres correspondantes et échangez directement avec les personnes concernées.' },
  { id: 2, question: 'La création d\'un compte est-elle gratuite ?', answer: 'Oui, l\'inscription et la création de profil sont entièrement gratuites. Certaines fonctionnalités avancées peuvent être proposées via des offres premium.' },
  { id: 3, question: 'Mes données sont-elles protégées ?', answer: 'Toutes vos données sont chiffrées et stockées de manière sécurisée. Nous ne partageons jamais vos informations personnelles sans votre consentement explicite.' },
  { id: 4, question: 'Puis-je modifier mon profil après inscription ?', answer: 'Bien sûr. Vous pouvez mettre à jour vos informations, vos préférences et vos documents à tout moment depuis votre espace personnel.' },
  { id: 5, question: 'Comment contacter le support ?', answer: 'Notre équipe support est disponible via le formulaire de contact ou par email. Nous répondons généralement sous 24 à 48 heures ouvrées.' },
  { id: 6, question: 'Puis-je supprimer mon compte à tout moment ?', answer: 'Oui, vous pouvez supprimer votre compte et l\'ensemble de vos données associées à tout moment depuis les paramètres de votre profil.' }
];

const FAQS = () => {
  const [openId, setOpenId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={sectionRef} className={`faqs ${isVisible ? 'is-visible' : ''}`}>
      <div className="faqs-container">
        <div className="faqs-row">
          <h2 className="faqs__title">FAQS</h2>
          <div className="faqs__list">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className={`faqs__item${isOpen ? ' faqs__item--open' : ''}`}>
                  <button
                    type="button"
                    className="faqs__question"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faqs-answer-${faq.id}`}
                  >
                    <span className="faqs__question-text">{faq.question}</span>
                    <span className="faqs__toggle-btn" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faqs-answer-${faq.id}`}
                    className="faqs__answer-wrapper"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="faqs__answer-inner">
                      <p className="faqs__answer">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQS;