import defaultDifferenceScreenshot from "../../assets/agents/difference-charlotte.webp";
import "../../styles/agents/Difference.css";

export default function Difference({
  title = 'Ce qui différencie Agentova des autres "Agents IA"',
  image = defaultDifferenceScreenshot,
  imageAlt = "Aperçu de la plateforme Agentova",
  buttonLabel = "Commencer maintenant",
}) {
  const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

  return (
    <section className="difference-section">
      <div className="difference-aurora difference-aurora--a" />
      <div className="difference-aurora difference-aurora--b" />

      <div className="difference-container">
        <div className="difference-row">
          <span className="difference-eyebrow">Comparatif</span>

          <h2 className="difference-title">{title}</h2>

          <button
            type="button"
            className="difference-btn"
            onClick={() =>
              window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer")
            }
          >
            {buttonLabel}
            <span className="difference-btn__arrow" aria-hidden="true">
              →
            </span>
          </button>

          <div className="difference-image-wrapper">
            <img src={image} alt={imageAlt} className="difference-image" />
          </div>
        </div>
      </div>
    </section>
  );
}