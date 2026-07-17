import { useState, useEffect, useRef } from 'react';
import '../styles/FAQS.css';

const faqs = [
  { id: 1, question: 'Comment se déroule un projet avec Avenir-Tech ?', answer: 'Après un échange sur vos besoins, nous vous proposons une proposition claire (objectifs, délais, budget). Nous concevons ensuite votre site par étapes, avec des points de validation réguliers, jusqu\'à la mise en ligne.' },
  { id: 2, question: 'Combien de temps faut-il pour créer un site web ?', answer: 'Cela dépend de la complexité du projet. Un site vitrine peut être livré en 2 à 3 semaines, tandis qu\'une plateforme sur mesure demande généralement de 4 à 8 semaines.' },
  { id: 3, question: 'Le site sera-t-il adapté aux mobiles et optimisé pour Google ?', answer: 'Oui. Chaque site que nous concevons est entièrement responsive et optimisé pour le référencement (SEO) dès sa conception, afin d\'assurer une bonne visibilité et une expérience fluide sur tous les écrans.' },
  { id: 4, question: 'Puis-je modifier mon site après sa mise en ligne ?', answer: 'Bien sûr. Selon la solution choisie, vous disposez d\'un espace d\'administration simple pour mettre à jour vos textes et vos images, ou vous pouvez nous confier ces modifications via notre offre de maintenance.' },
  { id: 5, question: 'Proposez-vous un accompagnement après la livraison ?', answer: 'Oui, nous proposons un suivi technique, des mises à jour de sécurité et une assistance réactive pour garantir la performance de votre site dans la durée.' },
  { id: 6, question: 'Comment demander un devis pour mon projet ?', answer: 'Il vous suffit de nous contacter via le formulaire du site ou par email en décrivant votre projet. Nous revenons généralement vers vous sous 24 à 48 heures ouvrées avec une proposition adaptée.' }
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