import "../../styles/agents/Potentiel.css";

export default function Potentiel() {
  return (
    <section className="potentiel-section">
      <div className="potentiel-aurora potentiel-aurora--a" />
      <div className="potentiel-aurora potentiel-aurora--b" />

      <div className="potentiel-container">
        <div className="potentiel-row">
          <span className="potentiel-eyebrow">Cerveau IA</span>

          <h2 className="potentiel-title">
            Déverrouillez le vrai potentiel de vos agents avec le Cerveau IA
          </h2>

          <p className="potentiel-description">
            Chaque cerveau IA mémorise tout : vos données, vos préférences, vos
            échanges. Le cerveau alimente chaque agent et connecte les
            informations entre eux...
          </p>
        </div>
      </div>
    </section>
  );
}