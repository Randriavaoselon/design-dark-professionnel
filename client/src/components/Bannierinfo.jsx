import "../styles/Bannierinfo.css";

const MESSAGES = [
  "AUTOMATISEZ VOTRE ENTREPRISE",
  "8 AGENTS IA SPÉCIALISÉS",
  "GAGNEZ DU TEMPS CHAQUE JOUR",
  "BOOSTEZ VOTRE PRODUCTIVITÉ",
];
const BannierInfo = () => {
  const track = [...MESSAGES, ...MESSAGES];

  return (
    <div className="banner-info">
      <div className="banner-info__diagonal-line" aria-hidden="true" />

      <div className="banner-info__track">
        {track.map((message, index) => (
          <div className="banner-info__item" key={index}>
            <span className="banner-info__text">{message}</span>
            <span className="banner-info__separator" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannierInfo;
