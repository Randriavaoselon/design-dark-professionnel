import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Simplify from "./Simplify";
import { trackClick } from "../utils/trackClick";
import phoneVideo from "../assets/videos/phone-demo.mp4";
import phonePoster from "../assets/videos/phone-demo.webp";
import imageAgent1 from "../assets/phone-agent1.webp"
import imageAgent2 from "../assets/phone-agent2.webp"
import imageAgent3 from "../assets/phone-agent3.webp"
import imageAgent4 from "../assets/phone-agent4.webp"
import "../styles/Onboardinghero.css";

const AGENTOVA_LINK = "https://www.agentova.ai/?fpr=selon84";

const LEFT_AVATARS = {
  start: { id: "avatar-1", src: imageAgent1 },
  end: { id: "avatar-3", src: imageAgent2 },
};

const RIGHT_AVATARS = {
  start: { id: "avatar-2", src: imageAgent3 },
  end: { id: "avatar-4", src: imageAgent4 },
};

function AvatarRail({ avatars, side }) {
  return (
    <div className={`onboarding__rail onboarding__rail--${side}`}>
      <div className="onboarding__rail-node onboarding__rail-node--start">
        <span className="onboarding__rail-dot onboarding__rail-dot--edge" />
        <div className="onboarding__avatar onboarding__avatar--start">
          <img src={avatars.start.src} alt="" className="onboarding__avatar-img" loading="lazy" />
        </div>
      </div>

      <div className="onboarding__rail-node onboarding__rail-node--middle">
        <span className="onboarding__rail-dot" />
      </div>

      <div className="onboarding__rail-node onboarding__rail-node--end">
        <span className="onboarding__rail-dot onboarding__rail-dot--edge" />
        <div className="onboarding__avatar onboarding__avatar--end">
          <img src={avatars.end.src} alt="" className="onboarding__avatar-img" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

function OnboardingHero() {
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

  // Lance la lecture une fois le téléphone visible, pour donner
  // l'impression que la démo se déclenche "en direct" à l'écran.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !isVisible) return;

    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay bloqué : le poster reste affiché, pas bloquant.
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
    <div className="onboarding-background" id="contact">
      <Simplify />
      <section
        className={`onboarding ${isVisible ? "is-visible" : ""}`}
        ref={sectionRef}
      >
        <div className="onboarding__container">
          {/* Anneaux d'orbite décoratifs */}
          <svg className="onboarding__orbits" viewBox="0 0 800 800" aria-hidden="true">
            <ellipse className="onboarding__orbit-ring onboarding__orbit-ring--outer" cx="400" cy="400" rx="380" ry="260" />
            <ellipse className="onboarding__orbit-ring onboarding__orbit-ring--inner" cx="400" cy="400" rx="250" ry="340" />
          </svg>

          <AvatarRail avatars={LEFT_AVATARS} side="left" />
          <AvatarRail avatars={RIGHT_AVATARS} side="right" />

          {/* Mockup du téléphone */}
          <div className="phone">
            <div className="phone__frame">
              <div className="phone__notch" />
              <div className="phone__screen">
                <div className="phone__status-bar">
                  <span className="phone__status-dot" />
                  <span className="phone__status-dot" />
                </div>

                <div className="phone__video-wrapper">
                  <video
                    ref={videoRef}
                    className="phone__video"
                    src={phoneVideo}
                    poster={phonePoster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Démonstration de l'application en action"
                  />
                  <span className="phone__video-shine" aria-hidden="true" />
                  <button
                    type="button"
                    className="phone__sound-toggle"
                    onClick={toggleSound}
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                  >
                    {isMuted ? (
                      <VolumeX size={13} strokeWidth={2} />
                    ) : (
                      <Volume2 size={13} strokeWidth={2} />
                    )}
                  </button>
                </div>

                <button 
                  type="button" 
                  className="phone__cta" 
                  onClick={() => {
                    trackClick("home-onboarding-phone");
                    window.open(AGENTOVA_LINK, "_blank", "noopener,noreferrer");
                  }}
                >
                  Essayer gratuitement
                </button>
              </div>
              <div className="phone__home-indicator" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OnboardingHero;