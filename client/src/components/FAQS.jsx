import { useState, useEffect, useRef } from 'react';
import '../styles/FAQS.css';

const faqs = [
  { id: 1, question: 'Qu\'est-ce qu\'Agentova ?', answer: 'Agentova est une plateforme qui permet d\'automatiser vos tâches quotidiennes en connectant vos outils à une équipe de 8 agents IA spécialisés.' },
  { id: 2, question: 'Quels sont les avantages de l\'utilisation d\'Agentova ?', answer: 'Gain de temps, réduction des coûts et augmentation de la productivité sont les principaux bénéfices rapportés par nos utilisateurs.' },
  { id: 3, question: 'Comment fonctionne le cerveau IA d\'Agentova ?', answer: 'Le cerveau IA d\'Agentova mémorise toutes les données, préférences et échanges pour alimenter chaque agent et connecter les informations entre eux.' },
  { id: 4, question: 'Puis-je essayer Agentova gratuitement ?', answer: 'Oui, vous pouvez essayer Agentova gratuitement pendant 7 jours.' },
  { id: 5, question: 'Quels sont les tarifs d\'Agentova ?', answer: 'Les tarifs sont exprimés en euros ou en francs suisses, avec des formules mensuelles, trimestrielles ou annuelles.' },
  { id: 6, question: 'Quels sont les agents IA disponibles sur Agentova ?', answer: 'Charlotte, Ethan, Benoit, Amandine, Margot, Arthur, Elisa et Samy : 8 agents IA spécialisés, chacun avec sa personnalité.' }
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
    <section ref={sectionRef} className={`faqs ${isVisible ? 'is-visible' : ''}`} id='faqs'>
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