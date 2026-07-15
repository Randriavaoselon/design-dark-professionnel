import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Resultatstat.css';

const BRANCH_HEIGHT = 60;
const CORNER_RADIUS = 10;

function buildConnectorPath(startX, point) {
  const direction = Math.sign(point.x - startX);

  if (direction === 0) {
    return `M ${startX} 0 L ${point.x} ${point.y}`;
  }

  const cornerStartX = point.x - direction * CORNER_RADIUS;
  const cornerEndY = CORNER_RADIUS;

  return `M ${startX} 0 L ${cornerStartX} 0 Q ${point.x} 0 ${point.x} ${cornerEndY} L ${point.x} ${point.y}`;
}

function useInViewOnce(
  options = { threshold: 0.4, rootMargin: '-15% 0px -15% 0px' }
) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
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

const LINE_DRAW_DURATION = 0.55;

const TRUNK_START_DELAY = 0.25;

const BRANCH_START_DELAY = TRUNK_START_DELAY + LINE_DRAW_DURATION * 0.6;

const BRANCH_STAGGER = 0.12;

function ResultatStat({ imageSrc, imageAlt, stats, HubIcon, animate }) {
  const middleIndex = stats.length % 2 === 1 ? (stats.length - 1) / 2 : -1;

  const [sectionRef, selfInView] = useInViewOnce({
    threshold: 0.4,
    rootMargin: '-15% 0px -15% 0px',
  });
  const isInView = animate || selfInView;

  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const cardRefs = useRef([]);
  const trunkLineRef = useRef(null);
  const pathRefs = useRef([]);

  const [cardPoints, setCardPoints] = useState([]);
  const [trunkTop, setTrunkTop] = useState(0);
  const [startX, setStartX] = useState(0);

  const measure = useCallback(() => {
    const wrapperEl = wrapperRef.current;
    const imageEl = imageRef.current;
    if (!wrapperEl || !imageEl) return;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const imageRect = imageEl.getBoundingClientRect();

    const imageBottomY = imageRect.bottom - wrapperRect.top;
    setTrunkTop(Math.max(0, -imageBottomY));
    setStartX(imageRect.left + imageRect.width / 2 - wrapperRect.left);

    const nextPoints = cardRefs.current.map((cardEl) => {
      if (!cardEl) return { x: 0, y: BRANCH_HEIGHT };
      const cardRect = cardEl.getBoundingClientRect();
      return {
        x: cardRect.left + cardRect.width / 2 - wrapperRect.left,
        y: cardRect.top - wrapperRect.top,
      };
    });

    setCardPoints(nextPoints);
  }, []);

  useLayoutEffect(() => {
    measure();

    const rafId = requestAnimationFrame(measure);
    const resizeObserver = new ResizeObserver(measure);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, stats.length]);

  useEffect(() => {
    const trunkEl = trunkLineRef.current;
    if (trunkEl && typeof trunkEl.getTotalLength === 'function') {
      const length = trunkEl.getTotalLength();
      trunkEl.style.strokeDasharray = `${length}`;
      trunkEl.style.strokeDashoffset = isInView ? '0' : `${length}`;
    }

    pathRefs.current.forEach((pathEl) => {
      if (!pathEl || typeof pathEl.getTotalLength !== 'function') return;
      const length = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = `${length}`;
      pathEl.style.strokeDashoffset = isInView ? '0' : `${length}`;
    });
  }, [isInView, cardPoints, trunkTop, startX]);

  cardRefs.current = [];
  pathRefs.current = [];

  const svgHeight = trunkTop + BRANCH_HEIGHT;

  return (
    <section
      className={`section-resultat ${isInView ? 'section-resultat--visible' : ''}`.trim()}
      ref={sectionRef}
    >
      <div className="container-resultat">
        <div className="row-image">
          <img
            className="image-resultat"
            src={imageSrc}
            alt={imageAlt}
            ref={imageRef}
            onLoad={measure}
          />
        </div>

        <div className="connector-wrapper" ref={wrapperRef}>
          <span
            className="connector-hub"
            style={{ left: `${startX}px`, top: `${-trunkTop}px` }}
            aria-hidden="true"
          >
            {HubIcon && <HubIcon size={18} strokeWidth={2} />}
          </span>

          <svg
            className="connector-lines"
            width="100%"
            height={svgHeight}
            style={{ top: -trunkTop }}
            aria-hidden="true"
          >
            {/* Tronc : part du hub, se trace en premier */}
            <line
              ref={trunkLineRef}
              className="connector-line connector-line--trunk"
              x1={startX}
              y1={0}
              x2={startX}
              y2={trunkTop}
              strokeLinecap="round"
              style={{
                transitionDuration: `${LINE_DRAW_DURATION}s`,
                transitionDelay: `${TRUNK_START_DELAY}s`,
              }}
            />

            {/* Branches : se tracent après le tronc, en cascade */}
            {cardPoints.map((point, index) => (
              <path
                key={stats[index].id}
                ref={(el) => (pathRefs.current[index] = el)}
                className="connector-line connector-line--branch"
                d={buildConnectorPath(startX, {
                  x: point.x,
                  y: point.y + trunkTop,
                })}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  transitionDuration: `${LINE_DRAW_DURATION}s`,
                  transitionDelay: `${BRANCH_START_DELAY + index * BRANCH_STAGGER}s`,
                }}
              />
            ))}
          </svg>

          {cardPoints.map((point, index) => {
            const dotDelay =
              BRANCH_START_DELAY + index * BRANCH_STAGGER + LINE_DRAW_DURATION;
            return (
              <span
                key={stats[index].id}
                className="connector-dot"
                style={{
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  transitionDelay: `${dotDelay}s`,
                }}
                aria-hidden="true"
              />
            );
          })}

          <div className="row-cards">
            {stats.map(({ id, Icon, value, color }, index) => {
              let modifierClass = '';
              if (index === middleIndex) {
                modifierClass = ' card--raised';
              } else if (middleIndex !== -1) {
                modifierClass = ' card--lowered';
              }

              const cardDelay =
                BRANCH_START_DELAY +
                index * BRANCH_STAGGER +
                LINE_DRAW_DURATION +
                0.1;

              return (
                <div
                  className={`card${modifierClass}`}
                  key={id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  style={{ transitionDelay: `${cardDelay}s` }}
                >
                  <span className="card-icon">
                    <Icon size={28} strokeWidth={2} />
                  </span>
                  <span style={{ color }} className="card-value">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

ResultatStat.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      Icon: PropTypes.elementType.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,

  HubIcon: PropTypes.elementType,
  animate: PropTypes.bool,
};

ResultatStat.defaultProps = {
  imageAlt: '',
  HubIcon: null,
  animate: false,
};

export default ResultatStat;