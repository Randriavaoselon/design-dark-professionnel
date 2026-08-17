import { useEffect, useRef, useState } from "react";
import BoutonComponent from "./Bouton";
import { trackClick } from "../utils/trackClick";
import {
  PlugZap,
  ShieldCheck,
  UsersRound,
  CalendarCheck,
  Volume2,
  VolumeX,
} from "lucide-react";

import solutionVideo from "../assets/videos/photo-solution.mp4";
import solutionPoster from "../assets/videos/photo-solution.webp";
import "../styles/Solution.css";

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

const cards = [
  {
    icon: PlugZap,
    title: "3 000+ intégrations",
    subtitle:
      "Connexion à plus de 3 000 applications",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité des données",
    subtitle:
      "Sécurité renforcée, confidentialité garantie",
  },
  {
    icon: UsersRound,
    title: "Workspace collaboratif",
    subtitle:
      "Un espace partagé pour toute votre équipe",
  },
  {
    icon: CalendarCheck,
    title: "Essai gratuit de 7 jours",
    subtitle:
      "7 jours pour découvrir toute la puissance",
  },
];

export default function Solution() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -50% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  // Ne lance la lecture qu'une fois la section entrée dans le viewport.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !isVisible) return;

    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Lecture auto bloquée par le navigateur : pas bloquant,
        // le poster reste affiché.
      });
    }
  }, [isVisible]);

  const toggleSound = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const nextMuted = !videoEl.muted;
    videoEl.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      videoEl.play().catch(() => {});
    }
  };

  return (
    <section
      className={`solution-section ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
      id="services"
    >
      <div className="solution-container">
        <div className="solution-row">
          {/* Colonne gauche : vidéo */}
          <div className="solution-col-left">
            <div className="solution-video-wrapper">
              <video
                ref={videoRef}
                className="solution-image"
                src={solutionVideo}
                poster={solutionPoster}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Illustration de la solution"
              />
              <button
                type="button"
                className="solution-sound-toggle"
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

          {/* Colonne droite : 4 cards + bouton */}
          <div className="solution-col-right">
            <div className="solution-cards-grid">
              {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    className="solution-card"
                    key={index}
                    style={{ "--card-delay": `${0.15 * index}s` }}
                  >
                    <div className="solution-card-icon-wrapper">
                      <Icon className="solution-card-icon" />
                    </div>
                    <h3 className="solution-card-title">{card.title}</h3>
                    <p className="solution-card-subtitle">{card.subtitle}</p>
                  </div>
                );
              })}
            </div>

            <BoutonComponent
              text="Lancer mon essai"
              onClick={() => {
                trackClick("home-solution");
                window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer");
              }}
              className="btn-solution"
            />
          </div>
        </div>
      </div>
    </section>
  );
}