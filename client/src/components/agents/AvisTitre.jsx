import { trackClick } from "../../utils/trackClick";
import "../../styles/agents/AvisTitre.css";

export default function AvisTitre({ trackingSource = "avis-titre" }) {
  const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";
  return (
    <section className="avis-titre-section">
      <div className="avis-titre-aurora avis-titre-aurora--a" />
      <div className="avis-titre-aurora avis-titre-aurora--b" />

      <div className="avis-titre-container">
        <div className="avis-titre-row">
          <span className="avis-titre-eyebrow">Avis clients</span>

          <h2 className="avis-titre-title">Ils en parlent mieux que nous.</h2>

          <button
            type="button"
            className="avis-titre-btn"
            onClick={() => {
              trackClick(trackingSource);
              window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer");
            }}
          >
            Commencer maintenant
            <span className="avis-titre-btn__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}