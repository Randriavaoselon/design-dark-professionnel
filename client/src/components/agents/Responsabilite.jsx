import "../../styles/agents/Responsabilite.css";

function Responsabilite({
  title = "Générez des visuels et publicités qui convertissent jusqu'à 17x plus.",
  buttonLabel = "Commencer maintenant",
}) {
  const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

  return (
    <section className="responsabilite">
      <div className="responsabilite__container">
        <div className="responsabilite__row">
          <h2 className="responsabilite__title">{title}</h2>

          <button
            type="button"
            className="responsabilite__button"
            onClick={() =>
              window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer")
            }
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Responsabilite;