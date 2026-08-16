import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { MegaMenu, MegaMenuMobile } from "./MegaMenu";
import "../../styles/Navbar.css";

function Navbar({ logo, leftMenuItems, rightMenuItems, ctaButton, className }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const megaCloseTimeout = useRef(null);

  const allMenuItems = [...leftMenuItems, ...rightMenuItems];

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  const handleCtaClick = (e) => {
    closeMenu();
    ctaButton?.onClick?.(e);
  };

  const openMega = (label) => {
    clearTimeout(megaCloseTimeout.current);
    setOpenMegaMenu(label);
  };

  const scheduleCloseMega = () => {
    // 250ms plutôt que 150ms : laisse le temps à la souris de traverser
    // l'espace visuel entre le lien et le panneau sans fermer par erreur.
    megaCloseTimeout.current = setTimeout(() => {
      setOpenMegaMenu(null);
    }, 250);
  };

  useEffect(() => {
    return () => clearTimeout(megaCloseTimeout.current);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      if (isMenuOpen) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setIsHidden(true);
        setOpenMegaMenu(null);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
        setOpenMegaMenu(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navbarClasses = [
    "navbar",
    isHidden ? "navbar--hidden" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const renderDesktopItem = (item) => {
    const hasMega = Array.isArray(item.megaMenu) && item.megaMenu.length > 0;

    return (
      <li
        key={item.label}
        className={`navbar__item ${hasMega ? "navbar__item--has-mega" : ""}`}
        onMouseEnter={() => hasMega && openMega(item.label)}
      >
        <a
          href={item.href}
          className="navbar__link"
          aria-haspopup={hasMega ? "true" : undefined}
          aria-expanded={hasMega ? openMegaMenu === item.label : undefined}
          onFocus={() => hasMega && openMega(item.label)}
          onClick={(e) => {
            if (hasMega) {
              e.preventDefault();
              setOpenMegaMenu((current) =>
                current === item.label ? null : item.label
              );
            }
          }}
        >
          {item.label}
          {hasMega && <span className="navbar__caret" aria-hidden="true" />}
        </a>

        {hasMega && (
          <MegaMenu
            items={item.megaMenu}
            isOpen={openMegaMenu === item.label}
            onMouseEnter={() => openMega(item.label)}
            onMouseLeave={scheduleCloseMega}
            onCardClick={() => setOpenMegaMenu(null)}
            heading={item.megaMenuHeading}
            subheading={item.megaMenuSubheading}
            featured={item.megaMenuFeatured}
          />
        )}
      </li>
    );
  };

  const renderMobileItem = (item, index) => {
    const hasMega = Array.isArray(item.megaMenu) && item.megaMenu.length > 0;
    const isOpen = openMobileSubmenu === item.label;

    return (
      <li
        key={item.label}
        className="navbar__mobile-item"
        style={{ "--item-index": index }}
      >
        {hasMega ? (
          <MegaMenuMobile
            items={item.megaMenu}
            isOpen={isOpen}
            label={item.label}
            onToggle={() => setOpenMobileSubmenu(isOpen ? null : item.label)}
            onCardClick={closeMenu}
          />
        ) : (
          <a
            href={item.href}
            className="navbar__mobile-link"
            onClick={closeMenu}
          >
            {item.label}
          </a>
        )}
      </li>
    );
  };

  return (
    <section className={navbarClasses}>
      <div className="navbar__container">
        <div
          className="navbar__row"
          onMouseLeave={() => openMegaMenu && scheduleCloseMega()}
        >
          <nav
            className="navbar__menu navbar__menu--left"
            aria-label="Primary navigation"
          >
            <ul className="navbar__list">
              {leftMenuItems.map((item) => renderDesktopItem(item))}
            </ul>
          </nav>

          <div className="navbar__brand">
            <a
              href={logo.href || "/"}
              className="navbar__logo-link"
              aria-label={logo.alt || "Home"}
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.alt || ""}
                  className="navbar__logo-img"
                />
              ) : (
                <span className="navbar__logo-text">{logo.text}</span>
              )}
            </a>
          </div>

          <div className="navbar__menu navbar__menu--right">
            <nav aria-label="Secondary navigation">
              <ul className="navbar__list">
                {rightMenuItems.map((item) => renderDesktopItem(item))}
              </ul>
            </nav>

            {ctaButton && (
              <a
                href={ctaButton.href || "#"}
                onClick={handleCtaClick}
                className="navbar__cta"
              >
                {ctaButton.label}
              </a>
            )}
          </div>

          <button
            type="button"
            className="navbar__burger"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
          >
            <span className="navbar__burger-bar" />
            <span className="navbar__burger-bar" />
            <span className="navbar__burger-bar" />
          </button>
        </div>
      </div>

      <div
        className={`navbar__mobile-panel ${
          isMenuOpen ? "navbar__mobile-panel--open" : ""
        }`}
      >
        <button
          type="button"
          className="navbar__mobile-close"
          onClick={closeMenu}
          aria-label="Fermer le menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <nav aria-label="Mobile navigation">
          <ul className="navbar__mobile-list">
            {allMenuItems.map((item, index) => renderMobileItem(item, index))}
          </ul>
        </nav>

        {ctaButton && (
          <a
            href={ctaButton.href || "#"}
            onClick={handleCtaClick}
            className="navbar__mobile-cta"
          >
            {ctaButton.label}
          </a>
        )}
      </div>

      {isMenuOpen && (
        <div
          className="navbar__backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </section>
  );
}

const megaMenuItemShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  href: PropTypes.string,
  badge: PropTypes.string,
});

const menuItemShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  megaMenu: PropTypes.arrayOf(megaMenuItemShape),
  megaMenuHeading: PropTypes.string,
  megaMenuSubheading: PropTypes.string,
  megaMenuFeatured: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
    ctaLabel: PropTypes.string,
  }),
});

Navbar.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
  }).isRequired,

  leftMenuItems: PropTypes.arrayOf(menuItemShape),
  rightMenuItems: PropTypes.arrayOf(menuItemShape),

  ctaButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func,
  }),

  className: PropTypes.string,
};

Navbar.defaultProps = {
  leftMenuItems: [],
  rightMenuItems: [],
  ctaButton: null,
  className: "",
};

export default Navbar;