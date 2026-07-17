import '../styles/NetworkGraph.css';
import avatar1 from '../assets/avatar-1.webp';
import avatar2 from '../assets/avatar-2.webp';
import avatar3 from '../assets/avatar-3.webp';
import avatar4 from '../assets/avatar-4.webp';
import avatar5 from '../assets/avatar-5.webp';
import avatar6 from '../assets/avatar-6.webp';
import avatar7 from '../assets/avatar-7.webp';

const VIEWBOX_WIDTH = 760;
const VIEWBOX_HEIGHT = 260;
const EDGE_MARGIN = 20;
const TOP_Y = 20;         
const BASE_Y = 254;        
const CENTER_X = VIEWBOX_WIDTH / 2;
const DOME_HEIGHT = BASE_Y - TOP_Y;
const R = CENTER_X - EDGE_MARGIN; 

const RAY_COUNT = 29;

const nodes = [
  { id: 1, image: avatar1, xFrac: 0.08, phi: 22, size: 46, ring: '#b5524a' },
  { id: 2, image: avatar2, xFrac: 0.24, phi: 62, size: 38, ring: '#3a4560' },
  { id: 3, image: avatar3, xFrac: 0.37, phi: 12, size: 48, ring: '#eef2ff' },
  { id: 4, image: avatar4, xFrac: 0.50, phi: 78, size: 32, ring: '#4f8ef7' },
  { id: 5, image: avatar5, xFrac: 0.63, phi: 40, size: 38, ring: '#d6688f' },
  { id: 6, image: avatar6, xFrac: 0.79, phi: 65, size: 58, ring: '#f0b429', glow: true },
  { id: 7, image: avatar7, xFrac: 0.91, phi: 18, size: 46, ring: '#a9c6f5' }
];

const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
  const endX = EDGE_MARGIN + (i / (RAY_COUNT - 1)) * (VIEWBOX_WIDTH - 2 * EDGE_MARGIN);
  const rx = Math.abs(endX - CENTER_X);
  const side = endX < CENTER_X ? 'left' : endX > CENTER_X ? 'right' : 'center';
  return { id: `ray-${i}`, endX, rx, side };
});

const rayPathD = ({ endX, rx, side }) => {
  if (side === 'center') {
    return `M ${CENTER_X} ${TOP_Y} L ${CENTER_X} ${BASE_Y}`;
  }
  const sweep = side === 'right' ? 1 : 0;
  return `M ${CENTER_X} ${TOP_Y} A ${rx} ${DOME_HEIGHT} 0 0 ${sweep} ${endX} ${BASE_Y}`;
};

const getPointOnRay = (xFrac, phiDeg) => {
  const endX = EDGE_MARGIN + xFrac * (VIEWBOX_WIDTH - 2 * EDGE_MARGIN);
  const rx = Math.abs(endX - CENTER_X);
  const rad = (phiDeg * Math.PI) / 180;
  const x = endX < CENTER_X
    ? CENTER_X - rx * Math.cos(rad)
    : CENTER_X + rx * Math.cos(rad);
  const y = BASE_Y - DOME_HEIGHT * Math.sin(rad);
  return { x, y };
};

const closestRayId = (xFrac) => {
  const endX = EDGE_MARGIN + xFrac * (VIEWBOX_WIDTH - 2 * EDGE_MARGIN);
  let closest = rays[0];
  let minDist = Infinity;
  rays.forEach((r) => {
    const d = Math.abs(r.endX - endX);
    if (d < minDist) {
      minDist = d;
      closest = r;
    }
  });
  return closest.id;
};

const NetworkGraph = () => {
  return (
    <section className="network-graph-section">
      <div className="network-graph-container">
        <div className="network-graph-row">
          <svg
            className="network-graph__canvas"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="ng-glow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {rays.map((ray) => (
              <path
                key={ray.id}
                id={ray.id}
                className="network-graph__arc"
                d={rayPathD(ray)}
                fill="none"
              />
            ))}

            {nodes.map((node) => {
              const rayId = closestRayId(node.xFrac);
              return (
                <circle
                  key={`dot-${node.id}`}
                  className="network-graph__dot"
                  r="2.5"
                  filter="url(#ng-glow)"
                >
                  <animateMotion
                    dur="4s"
                    begin={`${(node.id % 7) * 0.4}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#${rayId}`} />
                  </animateMotion>
                </circle>
              );
            })}

            {nodes.map((node) => {
              const { x, y } = getPointOnRay(node.xFrac, node.phi);
              return (
                <circle
                  key={`marker-${node.id}`}
                  className="network-graph__node-marker"
                  cx={x}
                  cy={y}
                  r="2.5"
                />
              );
            })}
          </svg>

          <div className="network-graph__avatars">
            {nodes.map((node) => {
              const { x, y } = getPointOnRay(node.xFrac, node.phi);
              return (
                <div
                  key={node.id}
                  className={`network-graph__avatar${node.glow ? ' network-graph__avatar--glow' : ''}`}
                  style={{
                    left: `${(x / VIEWBOX_WIDTH) * 100}%`,
                    top: `${(y / VIEWBOX_HEIGHT) * 100}%`,
                    width: `${(node.size / VIEWBOX_WIDTH) * 100}%`,
                    height: `${(node.size / VIEWBOX_HEIGHT) * 100}%`,
                    '--ring-color': node.ring
                  }}
                >
                  <img src={node.image} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkGraph;