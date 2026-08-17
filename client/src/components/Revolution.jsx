import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import BoutonComponent from "./Bouton";
import { trackClick } from "../utils/trackClick";
import revolutionVideo from "../assets/videos/revolution-video.mp4";
import revolutionPoster from "../assets/videos/revolution-image.webp";
import "../styles/Revolution.css";

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

function useInViewOnce(options = { threshold: 0, rootMargin: "0px 0px -15% 0px" }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

const Revolution = () => {
  const [sectionRef, isInView] = useInViewOnce();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Ne lance la lecture qu'une fois la section entrée dans le viewport,
  // pour éviter de charger/jouer la vidéo inutilement en arrière-plan.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !isInView) return;

    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Lecture auto bloquée par le navigateur : pas bloquant,
        // le poster reste affiché.
      });
    }
  }, [isInView]);

  const toggleSound = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const nextMuted = !videoEl.muted;
    videoEl.muted = nextMuted;
    setIsMuted(nextMuted);

    // Le clic est une interaction utilisateur : si la lecture s'était
    // arrêtée (autoplay bloqué), on peut relancer la vidéo avec le son.
    if (!nextMuted) {
      videoEl.play().catch(() => {});
    }
  };

  return (
    <section
      className={`revolution-section ${
        isInView ? "revolution-section--visible" : ""
      }`.trim()}
      ref={sectionRef}
      id="services"
    >
      <div className="revolution-container">
        <div className="revolution-row">
          {/* Colonne Gauche */}
          <div className="revolution-col revolution-col-left">
            <h2 className="revolution-title">Automatisez votre entreprise</h2>
            <p className="revolution-text">
              Agentova met à votre disposition 8 agents IA spécialisés pour vous
              épauler au quotidien. Vous pouvez leur demander d'exécuter des
              tâches en un claquement de doigt, et ils travaillent pendant que
              vous dormez. Les agents IA d'Agentova sont équipés d'un "Cerveau
              IA" qui mémorise vos données, vos préférences et vos échanges, et
              qui alimente chaque agent pour connecter les informations entre
              eux. <br/> <br/>Ces agents peuvent automatiser vos tâches dans les domaines
              du marketing, des ventes, du SEO et de la relation client. Vous
              pouvez les intégrer avec vos outils favoris, tels que WhatsApp,
              Instagram, Notion CRM, etc.
            </p>
            <BoutonComponent
              text="Découvrir les agents IA"
              onClick={() => {
                trackClick("home-revolution");
                window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer");
              }}
              className="btn-revolution"
            />
          </div>

          {/* Colonne Droite */}
          <div className="revolution-col revolution-col-right">
            <div className="revolution-image-wrapper">
              <video
                ref={videoRef}
                className="revolution-image"
                src={revolutionVideo}
                poster={revolutionPoster}
                width={912}
                height={1174}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Illustration de la révolution digitale"
              />
              <button
                type="button"
                className="revolution-sound-toggle"
                onClick={toggleSound}
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? (
                  <VolumeX size={18} strokeWidth={2} />
                ) : (
                  <Volume2 size={18} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revolution;