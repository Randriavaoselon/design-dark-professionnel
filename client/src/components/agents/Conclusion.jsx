import BoutonComponent from "../Bouton";
import Footer from "../../components/footer/Footer";

import starIcon from "../../assets/agents/star-icon.svg";
import "../../styles/agents/Conclusion.css";

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";
const STAR_COUNT = 4;

function Conclusion() {
  return (
    <section className="conclusion-section">
      <div className="conclusion-container">
        <div className="conclusion-row">
          <div className="conclusion__rating">
            <span className="conclusion__rating-label">Excellent</span>
            <span className="conclusion__stars" aria-hidden="true">
              {Array.from({ length: STAR_COUNT }).map((_, index) => (
                <img
                  key={index}
                  src={starIcon}
                  alt=""
                  className="conclusion__star"
                />
              ))}
            </span>
            <span className="conclusion__rating-score">Noté 4.7 sur 5</span>
          </div>

          <h2 className="conclusion__title">
            Prêt à récupérer votre temps ?
          </h2>

          <p className="conclusion__description">
            Récupérez 10 à 15 heures par semaine, et prenez de l'avance
            pendant que les autres "testent encore l'IA". Votre essai
            gratuit démarre en 30 secondes.
          </p>

          <BoutonComponent
            text="Commencé maintenant"
            onClick={() =>
              window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer")
            }
            className="conclusion__btn"
          />
        </div>
      </div>
      <Footer/>
    </section>
  );
}

export default Conclusion;