import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Layers,
  Info,
  HelpCircle,
  Mail,
  Menu,
  X,
} from "lucide-react";
import "../styles/Sidebarmenu.css";

const DEFAULT_ITEMS = [
  { id: "services", label: "Services", href: "#services", Icon: Layers },
  { id: "apropos", label: "À propos", href: "#a-propos", Icon: Info },
  { id: "faqs", label: "FAQs", href: "#faqs", Icon: HelpCircle },
  { id: "contact", label: "Contact", href: "#contact", Icon: Mail },
];

const SCROLL_DELTA_THRESHOLD = 6;
const SCROLL_TOP_THRESHOLD = 80;

function SidebarMenu({
  items = DEFAULT_ITEMS,
  activeId,
  onItemSelect,
  brand = null,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [internalActiveId, setInternalActiveId] = useState(
    activeId ?? items[0]?.id ?? null
  );

  const [isHidden, setIsHidden] = useState(false);

  const currentActiveId = activeId ?? internalActiveId;

  useEffect(() => {
    if (activeId !== undefined) setInternalActiveId(activeId);
  }, [activeId]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsDrawerOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
    
      if (currentScrollY <= SCROLL_TOP_THRESHOLD) {
        setIsHidden(true);
      } else if (Math.abs(delta) >= SCROLL_DELTA_THRESHOLD) {
        setIsHidden(delta < 0); 
      }
    
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = useCallback(
    (item, event) => {
      if (!item.href || item.href === "#") event.preventDefault();
      setInternalActiveId(item.id);
      onItemSelect?.(item);
      setIsDrawerOpen(false);
    },
    [onItemSelect]
  );

  const renderLink = (item, { withLabel }) => {
    const isActive = item.id === currentActiveId;
    return (
      <a
        href={item.href || "#"}
        className={`sidebar-menu__link ${
          isActive ? "sidebar-menu__link--active" : ""
        }`.trim()}
        aria-current={isActive ? "page" : undefined}
        onClick={(event) => handleItemClick(item, event)}
      >
        <span className="sidebar-menu__icon">
          <item.Icon size={20} strokeWidth={2} />
        </span>

        {withLabel && <span className="sidebar-menu__label">{item.label}</span>}

        {item.badge != null && withLabel && (
          <span className="sidebar-menu__badge">{item.badge}</span>
        )}

        {!withLabel && (
          <span className="sidebar-menu__tooltip" role="tooltip">
            {item.label}
          </span>
        )}
      </a>
    );
  };

  const renderList = (withLabel) => (
    <ul className="sidebar-menu__list">
      {items.map((item) => (
        <li className="sidebar-menu__item" key={item.id}>
          {renderLink(item, { withLabel })}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <aside
        className={`sidebar-menu ${
          isHidden ? "sidebar-menu--hidden" : ""
        }`.trim()}
        aria-label="Navigation principale"
        aria-hidden={isHidden}
      >
        {brand && <div className="sidebar-menu__brand">{brand}</div>}
        <nav className="sidebar-menu__nav">{renderList(false)}</nav>
      </aside>

      <button
        type="button"
        className="sidebar-menu__mobile-trigger"
        onClick={() => setIsDrawerOpen(true)}
        aria-label="Ouvrir le menu de navigation"
      >
        <Menu size={20} strokeWidth={2.2} />
      </button>

      <div
        className={`sidebar-menu__drawer ${
          isDrawerOpen ? "sidebar-menu__drawer--open" : ""
        }`}
      >
        <button
          type="button"
          className="sidebar-menu__drawer-close"
          onClick={() => setIsDrawerOpen(false)}
          aria-label="Fermer le menu"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        {brand && <div className="sidebar-menu__drawer-brand">{brand}</div>}
        <nav aria-label="Navigation principale (mobile)">
          {renderList(true)}
        </nav>
      </div>

      {isDrawerOpen && (
        <div
          className="sidebar-menu__backdrop"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

SidebarMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      Icon: PropTypes.elementType.isRequired,
      badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onItemSelect: PropTypes.func,
  brand: PropTypes.node,
};

export default SidebarMenu;
