import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

import BoutonComponent from "./Bouton";
import "../styles/Home.css";

import heroImage from "../assets/Hero.webp";
import professionnalBadge from "../assets/iconText.webp";
import coBadge from "../assets/iconText2.webp";
import platformBadge from "../assets/iconText3.webp";

const PARAGRAPH_TEXT =
  "Avenir Tech conçoit des sites web modernes, responsives et professionnels, pensés pour propulser votre entreprise vers l'avenir du numérique.";

const PHASES = {
  TITLE: "title",
  PAUSE: "pause",
  PARAGRAPH: "paragraph",
  DONE: "done",
};

function useTitleBlocks() {
  return useMemo(() => {
    const blocks = [
      { type: "plainText", text: "Votre site web" },
      { type: "badge", key: "badge-pro", src: professionnalBadge },
      { type: "break" },
      { type: "prefixedWord", key: "word-co", badgeSrc: coBadge, text: "moderne et" },
      { type: "break" },
      {
        type: "suffixedWord",
        key: "word-platform",
        badgeSrc: platformBadge,
        text: "sur mesure",
      },
    ];

    const stepsOf = (block) => {
      switch (block.type) {
        case "plainText":
          return block.text.length;
        case "badge":
        case "break":
          return 1;
        case "prefixedWord":
        case "suffixedWord":
          return block.text.length + 1;
        default:
          return 0;
      }
    };

    const totalSteps = blocks.reduce((sum, b) => sum + stepsOf(b), 0);

    return { blocks, stepsOf, totalSteps };
  }, []);
}

function renderTitleBlock(block, visibleSteps) {
  if (visibleSteps <= 0) return null;

  switch (block.type) {
    case "plainText":
      return block.text.slice(0, visibleSteps);

    case "badge":
      return (
        <span className="home__badge" key={block.key}>
          <img src={block.src} alt="" className="home__badge-image" />
        </span>
      );

    case "break":
      return <br key="break" />;

    case "prefixedWord": {
      const badgeVisible = visibleSteps >= 1;
      const charsVisible = Math.max(0, visibleSteps - 1);
      return (
        <span className="home__title-word" key={block.key}>
          {badgeVisible && (
            <span className="home__badge">
              <img
                src={block.badgeSrc}
                alt=""
                className="home__badge-image"
              />
            </span>
          )}
          {block.text.slice(0, charsVisible)}
        </span>
      );
    }

    case "suffixedWord": {
      const charsVisible = Math.min(visibleSteps, block.text.length);
      const badgeVisible = visibleSteps > block.text.length;
      return (
        <span className="home__title-word" key={block.key}>
          {block.text.slice(0, charsVisible)}
          {badgeVisible && (
            <span className="home__badge">
              <img
                src={block.badgeSrc}
                alt=""
                className="home__badge-image"
              />
            </span>
          )}
        </span>
      );
    }

    default:
      return null;
  }
}

function useSequentialTypewriter({
  titleTotalSteps,
  paragraphLength,
  typingSpeed = 32,
  pauseDuration = 400,
}) {
  const [phase, setPhase] = useState(PHASES.TITLE);
  const [titleSteps, setTitleSteps] = useState(0);
  const [paragraphChars, setParagraphChars] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTitleSteps(titleTotalSteps);
      setParagraphChars(paragraphLength);
      setPhase(PHASES.DONE);
    }
  }, []);

  useEffect(() => {
    if (phase === PHASES.DONE) return undefined;

    let timeoutId;

    if (phase === PHASES.TITLE) {
      if (titleSteps < titleTotalSteps) {
        timeoutId = setTimeout(() => setTitleSteps((s) => s + 1), typingSpeed);
      } else {
        timeoutId = setTimeout(() => setPhase(PHASES.PAUSE), pauseDuration);
      }
    } else if (phase === PHASES.PAUSE) {
      timeoutId = setTimeout(() => setPhase(PHASES.PARAGRAPH), 150);
    } else if (phase === PHASES.PARAGRAPH) {
      if (paragraphChars < paragraphLength) {
        timeoutId = setTimeout(
          () => setParagraphChars((c) => c + 1),
          typingSpeed / 1.7
        );
      } else {
        timeoutId = setTimeout(() => setPhase(PHASES.DONE), 200);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [phase, titleSteps, paragraphChars, titleTotalSteps, paragraphLength, typingSpeed, pauseDuration]);

  return {
    phase,
    titleSteps,
    paragraphChars,
    isDone: phase === PHASES.DONE,
  };
}

function Home({ className }) {
  const { blocks, stepsOf, totalSteps } = useTitleBlocks();
  const { phase, titleSteps, paragraphChars, isDone } =
    useSequentialTypewriter({
      titleTotalSteps: totalSteps,
      paragraphLength: PARAGRAPH_TEXT.length,
    });

  const fullTitleText = "Votre site web moderne et sur mesure";

  let consumed = 0;

  return (
    <section className={`home ${className}`.trim()}>
      <div className="home__container">
        <div className="home__row">
          <div className="home__column home__column--text">
            <h1 className="home__title" aria-label={fullTitleText}>
              <span aria-hidden="true">
                {blocks.map((block) => {
                  const blockSteps = stepsOf(block);
                  const visible = Math.min(
                    Math.max(titleSteps - consumed, 0),
                    blockSteps
                  );
                  consumed += blockSteps;
                  return (
                    <span key={block.key || block.type + consumed}>
                      {renderTitleBlock(block, visible)}
                    </span>
                  );
                })}
                {phase === PHASES.TITLE && (
                  <span className="home__cursor" />
                )}
              </span>
            </h1>

            <p className="home__paragraph" aria-label={PARAGRAPH_TEXT}>
              <span aria-hidden="true">
                {PARAGRAPH_TEXT.slice(0, paragraphChars)}
                {phase === PHASES.PARAGRAPH && (
                  <span className="home__cursor home__cursor--paragraph" />
                )}
              </span>
            </p>

            <div
              className={`home__cta ${
                isDone ? "home__cta--visible" : ""
              }`.trim()}
            >
              <BoutonComponent
                text="Commencer"
                onClick={() => console.log("Action déclenchée")}
                href="/commencer"
              />
            </div>
          </div>

          <div className="home__column home__column--media">
            <img
              src={heroImage}
              alt="Illustration de la plateforme de co-optation"
              className="home__image home__image--float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

Home.propTypes = {
  className: PropTypes.string,
};

Home.defaultProps = {
  className: "",
};

export default Home;