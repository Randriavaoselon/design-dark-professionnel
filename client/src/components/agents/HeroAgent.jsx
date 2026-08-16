import { Check } from "lucide-react";
import "../../styles/agents/HeroAgentCharlotte.css";

function HeroAgent({ image, imageAlt, name, cards = [] }) {
  return (
    <section className="hero-charlotte">
      <div className="hero-charlotte__container">
        <div className="hero-charlotte__row">
          <span className="hero-charlotte__eyebrow">
            <span className="hero-charlotte__eyebrow-dot" aria-hidden="true" />
            {name}
          </span>

          <div className="hero-charlotte__stage">
            <span className="hero-charlotte__glow" aria-hidden="true" />

            <img
              src={image}
              alt={imageAlt || `Agent ${name}`}
              className="hero-charlotte__image"
            />

            {cards.map((card, index) => (
              <div
                key={index}
                className={`hero-charlotte__card hero-charlotte__card--${index + 1}`}
              >
                <span className="hero-charlotte__card-icon">
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <div className="hero-charlotte__card-body">
                  <p className="hero-charlotte__card-title">{card.title}</p>
                  <p className="hero-charlotte__card-text">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroAgent;