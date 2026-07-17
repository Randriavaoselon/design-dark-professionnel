import { useEffect, useRef, useState } from "react";
import ModalContact from "./ModalContact";
import Simplify from "./Simplify";
import "../styles/Onboardinghero.css";

const LEFT_AVATARS = {
  start: { id: "avatar-1", src: "https://i.pravatar.cc/100?img=12" },
  end: { id: "avatar-3", src: "https://i.pravatar.cc/100?img=47" },
};

const RIGHT_AVATARS = {
  start: { id: "avatar-2", src: "https://i.pravatar.cc/100?img=33" },
  end: { id: "avatar-4", src: "https://i.pravatar.cc/100?img=5" },
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
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

                <h1 className="phone__title">
                  Votre projet web,
                  <br />
                  suivi en un seul endroit
                </h1>

                <div className="phone__illustration">
                  {/* ... Votre SVG reste inchangé ... */}
                  <svg viewBox="0 0 220 200" className="phone__illustration-svg" aria-hidden="true">
                    <g className="illustration__box">
                      <polygon className="illustration__face illustration__face--top" points="110,30 180,68 110,106 40,68" />
                      <polygon className="illustration__face illustration__face--left" points="40,68 110,106 110,160 40,122" />
                      <polygon className="illustration__face illustration__face--right" points="110,106 180,68 180,122 110,160" />
                      <polygon className="illustration__accent" points="118,116 168,90 168,100 118,126" />
                      <polygon className="illustration__stripe" points="46,80 104,110 104,120 46,90" />
                    </g>
                    <g className="illustration__envelope">
                      <rect x="128" y="18" width="46" height="32" rx="3" />
                      <polyline points="128,20 151,38 174,20" />
                    </g>
                  </svg>
                </div>

                <button 
                  type="button" 
                  className="phone__cta" 
                  onClick={() => setIsModalOpen(true)}
                >
                  Contactez-nous
                </button>
              </div>
              <div className="phone__home-indicator" />
            </div>
          </div>
        </div>
      </section>

      {/* Le Modal est rendu ici, au niveau du parent */}
      <ModalContact 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default OnboardingHero;