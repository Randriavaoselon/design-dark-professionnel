import "../../styles/agents/Info.css";

// Remplace ces chemins par tes propres assets de logos
import logo1 from "../../assets/logos/logo1.avif";
import logo2 from "../../assets/logos/logo2.avif";
import logo3 from "../../assets/logos/logo3.svg";
import logo4 from "../../assets/logos/logo4.svg";
import logo5 from "../../assets/logos/logo5.svg";
import logo6 from "../../assets/logos/logo6.svg";

const logos = [
  { src: logo1, alt: "Logo entreprise 1" },
  { src: logo2, alt: "Logo entreprise 2" },
  { src: logo3, alt: "Logo entreprise 3" },
  { src: logo4, alt: "Logo entreprise 4" },
  { src: logo5, alt: "Logo entreprise 5" },
  { src: logo6, alt: "Logo entreprise 6" },
];

function Info() {
  return (
    <section className="info">
      <div className="info__container">
        <div className="info__marquee">
          {/* Deux pistes identiques mises bout à bout pour un défilement
              infini sans coupure visible */}
          <div className="info__track" aria-hidden="false">
            {logos.map((logo, index) => (
              <img
                key={`logo-a-${index}`}
                src={logo.src}
                alt={logo.alt}
                className="info__logo"
              />
            ))}
          </div>
          <div className="info__track" aria-hidden="true">
            {logos.map((logo, index) => (
              <img
                key={`logo-b-${index}`}
                src={logo.src}
                alt=""
                className="info__logo"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Info;