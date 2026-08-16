import { useState } from "react";
import "../../styles/agents/Question.css";

const defaultFaqItems = [
  {
    question: "Que puis-je faire avec Charlotte ?",
    answer:
      "Charlotte est votre directrice artistique IA disponible 24/7. Elle crée vos publicités, posts réseaux sociaux, visuels et campagnes complètes qui reflètent parfaitement votre identité de marque. Pas de templates génériques. Juste du contenu créatif aligné avec votre ADN, prêt à être diffusé.",
  },
  {
    question: "En quoi Charlotte est différente des autres outils de création IA ?",
    answer:
      "1. ADN créatif intégré — Charlotte apprend votre ton, votre style et votre audience pour que chaque création semble venir directement de votre équipe.\n2. Intelligence créative éprouvée — Formée sur des milliers de campagnes performantes, Charlotte génère du contenu conçu pour engager et convertir, pas simplement pour remplir l'espace.\n3. Multi-format et multi-canal — Que ce soit pour Instagram, LinkedIn, Facebook ou vos publicités, Charlotte adapte automatiquement vos créations à chaque plateforme avec cohérence.",
  },
  {
    question: "Ai-je besoin de compétences en design ou marketing pour utiliser Charlotte ?",
    answer:
      "Non. Charlotte a été pensée pour les entrepreneurs, créateurs et marketeurs qui veulent de la vitesse et des résultats, pas une courbe d'apprentissage. Vous vous concentrez sur votre vision, Charlotte s'occupe de l'exécution.",
  },
  {
    question: "Quel type de contenu Charlotte peut-elle générer ?",
    answer:
      "Tout ce dont vous avez besoin pour développer votre business :\n.Créatives publicitaires (statiques et vidéo)\n.Posts pour les réseaux sociaux\n.Campagnes de contenu complètes\n.Visuels de marque (flyers, bannières, stories)\nEt bien plus — toujours aligné avec votre identité.",
  },
  {
    question: "Puis-je gérer plusieurs marques avec Charlotte ?",
    answer:
      "Oui. Vous pouvez gérer jusqu'à 10 marques depuis un seul compte Agentova. Chacune dispose de son propre ADN créatif, workspace et bibliothèque de templates.",
  },
  {
    question: "Dois-je avoir des compétences en design ou montage pour utiliser Charlotte ?",
    answer:
      "Non. Charlotte gère la création. Vous vous concentrez sur la stratégie et le lancement.",
  },
  {
    question: "Charlotte est-elle meilleure que ChatGPT pour créer du contenu marketing ?",
    answer:
      "ChatGPT et d'autres IA générales sont puissants. Mais Charlotte est spécialisée : le marketing. Avec ChatGPT, vous êtes coincé dans des allers-retours de prompts, à ajuster les outputs, et à assembler des visuels qui ne matchent pas avec votre marque. Charlotte élimine tout ça. C'est une IA dédiée : vos campagnes sont créées, brandées et prêtes à être lancées en quelques minutes. Pas de prompts complexes. Pas de bricolage. Juste des créations marketing performantes, livrées.",
  },
  {
    question: "Charlotte convient-elle à mon type d'entreprise ?",
    answer:
      "Oui. Charlotte est adaptée à toute entreprise. Elle est particulièrement efficace pour les marques e-commerce, les coachs, consultants et créateurs de contenu qui veulent produire du contenu de qualité rapidement et de manière cohérente.",
  },
  {
    question: "Est-ce que ça fonctionne si je n'ai pas de site web ?",
    answer:
      "Oui. Vous pouvez utiliser n'importe quelle URL valide lors de l'onboarding et mettre à jour vos informations de marque plus tard dans le processus.",
  },
];

function FaqItem({ question, answer, isOpen, onToggle }) {
  const lines = answer.split("\n");

  return (
    <div className={`question-item ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="question-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="question-item__question">{question}</span>
        <span className="question-item__icon" aria-hidden="true">
          <span className="question-item__icon-bar question-item__icon-bar--v" />
          <span className="question-item__icon-bar question-item__icon-bar--h" />
        </span>
      </button>

      <div className="question-item__panel">
        <div className="question-item__panel-inner">
          <p className="question-item__answer">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Question({
  eyebrow = "FAQ",
  title = "Les questions fréquentes",
  description = (
    <>
      Vous ne trouvez pas la réponse à vos questions ?
      <br />
      Contactez-nous ici ou réserver une démo.
    </>
  ),
  buttonLabel = "Commencer maintenant",
  faqItems = defaultFaqItems,
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

  return (
    <section className="question-section">
      <div className="question-container">
        <div className="question-row">
          {/* Colonne gauche */}
          <div className="question-col-left">
            <span className="question-eyebrow">{eyebrow}</span>
            <h2 className="question-title">{title}</h2>
            <p className="question-description">{description}</p>
            <button
              type="button"
              className="question-btn"
              onClick={() =>
                window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer")
              }
            >
              {buttonLabel}
              <span className="question-btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          {/* Colonne droite */}
          <div className="question-col-right">
            {faqItems.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}