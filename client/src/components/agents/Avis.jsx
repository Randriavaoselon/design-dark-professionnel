import { useState } from "react";
import { User } from "lucide-react";
import avisImage5 from "../../assets/agents/avis-preview-5.jpg";
import avisImage6 from "../../assets/agents/avis-preview-6.jpeg";
import avisImage7 from "../../assets/agents/avis-preview-7.jpeg";
import avisImage8 from "../../assets/agents/avis-preview-8.png";
import avisImage9 from "../../assets/agents/avis-preview-9.png";
import "../../styles/agents/Avis.css";

const columnOneReviews = [
  { title: "Pierre Martin", text: "top pour mon resto 👍" },
  { title: "Sophie Rousseau", text: "j'étais franchement sceptique au début, encore un outil miracle, et puis en fait non. Ma comm LinkedIn se gère quasi toute seule maintenant. Contenu cohérent, visuels pros, programmation automatique. Je peux enfin me concentrer sur mon coeur de métier et pas perdre 2h par jour sur les réseaux sociaux à me demander quoi poster." },
  { title: "Thomas Blanc", text: "qualité ouf pour le prix" },
  { title: "Marine Lambert", text: "avant je payais 800 balles par mois un community manager. Là, pour une fraction du prix, tout est géré : contenu, visuels, programmation. J'économise du temps ET de l'argent." },
  { title: "Lucas Petit", text: "simple, efficace, ça fait le taff" },
  { title: "Kevin Moreau", text: "ça analyse ce qui marche chez les concurrents et sort des trucs qui convertissent bien" },
  { title: "Inès Dubois", text: "j'suis nulle en design, tout se fait auto. Les visuels sont apaisants, pile ce qu'il faut pour mon domaine." },
  { title: "Manon Leroy", text: "même moi qui suis graphiste je l'utilise pour mes réseaux perso, ça me libère du temps pour mes vrais clients" },
  { title: "Hugo Fabre", text: "enfin des posts immo corrects, avant c'était vraiment pas ouf 😂" },
  { title: "Sarah Mercier", text: "j'avais peur que ça fasse robot mais ça respecte bien mon ton empathique. Le contenu parle vraiment à mon audience et ça reste authentique." },
  { title: "Dylan Perrin", text: "je code h24, la comm c'est pas mon truc, là c'est géré" },
];

const columnTwoReviews = [
  { title: "Camille Bonnet", text: "l'univers mariage est bien compris, visuels romantiques, élégants, dans mes couleurs. Mes clientes kiffent mes posts et moi je gagne des heures chaque semaine, plus besoin de stresser sur la création de contenu." },
  { title: "Julien Roux", text: "j'ai viré mon CM, économisé 1500 balles par mois" },
  { title: "Emma Morel", text: "mes abonnés ont doublé en 1 mois" },
  { title: "Maxime Dupont", text: "on utilise pour 8 clients différents, ça s'adapte à chaque secteur, chaque ton, chaque identité. La qualité est au rendez-vous et maintenant on facture nos prestations 3x plus cher, l'outil s'est rentabilisé en littéralement 1 semaine." },
  { title: "Amélie Dubois", text: "j'gère ma boutique toute seule et cet outil m'a sauvé la vie franchement. Avant je mettais 3h pour faire un post correct, maintenant 5 min chrono, et en plus c'est cohérent avec mes couleurs, ma charte, tout. J'ai récupéré tellement de temps que j'ai pu me concentrer sur la création de nouveaux produits au lieu de galérer sur les réseaux.", image: avisImage5 },
  { title: "Mehdi Baldissera", text: "ça m'a sorti 2 semaines de contenu en 10 minutes", image: avisImage6 },
];

const columnThreeReviews = [
  { title: "Mathieu Palacios", text: "on a testé sur un gros client et franchement on a gagné un temps de ouf. Des visuels qu'on aurait mis des heures voire des jours à produire, sortis en quelques clics. Maintenant on utilise pour tous nos clients et on peut se concentrer sur la strat plutôt que la prod.", image: avisImage7 },
  { title: "Chloé Bernard", text: "c'est devenu mon assistante créative h24. Idées de posts, visuels, programmation, tout se fait automatiquement. Je passais 10h par semaine sur les réseaux, maintenant c'est 1h max. Gain de temps énorme franchement, et en plus la qualité est là, les gens voient pas la différence avec ce que je faisais avant en beaucoup plus de temps.", image: avisImage8 },
  { title: "Antoine Girard", text: "mon engagement a explosé depuis que j'utilise ça. +40% en 3 semaines franchement. Ça suit les tendances mode, adapte les visuels à ma charte et programme mes stories et posts. Rapport qualité prix de dingue, surtout quand tu vois ce que ça te ferait économiser en CM ou en agence.", image: avisImage9 },
];

const INITIAL_COUNT = 3;

function ReviewCard({ title, text, image }) {
  return (
    <div className="avis-card">
      <div className="avis-card__head">
        <span className="avis-card__icon">
          <User size={16} strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="avis-card__title">{title}</h3>
      </div>
      <p className="avis-card__text">{text}</p>

      {image && (
        <div className="avis-card__image-wrapper">
          <img src={image} alt="" className="avis-card__image" />
        </div>
      )}
    </div>
  );
}

export default function Avis() {
  const [expanded, setExpanded] = useState(false);

  const col1 = expanded ? columnOneReviews : columnOneReviews.slice(0, INITIAL_COUNT);
  const col2 = expanded ? columnTwoReviews : columnTwoReviews.slice(0, INITIAL_COUNT);
  const col3 = expanded ? columnThreeReviews : columnThreeReviews.slice(0, INITIAL_COUNT);

  return (
    <section className="avis-section">
      <div className="avis-container">
        <div
          className={`avis-row ${!expanded ? "avis-row--collapsed" : ""}`}
        >
          <div className="avis-col">
            {col1.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>

          <div className="avis-col">
            {col2.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>

          <div className="avis-col">
            {col3.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>
        </div>

        {!expanded && (
          <div className="avis-more-wrapper">
            <button
              type="button"
              className="avis-more-btn"
              onClick={() => setExpanded(true)}
            >
              Voir plus d'avis
              <span className="avis-more-btn__arrow" aria-hidden="true">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}