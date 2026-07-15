import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../styles/Navbar.css";

function Navbar({ logo, leftMenuItems, rightMenuItems, ctaButton, className }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const allMenuItems = [...leftMenuItems, ...rightMenuItems];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (isMenuOpen) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        // scroll vers le bas au-delà du seuil -> on masque
        setIsHidden(true);
      } else {
        // scroll vers le haut (ou en haut de page) -> on réaffiche
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

  // --- Verrouille le scroll du body quand le panneau mobile est ouvert
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

  // --- Ferme le menu mobile avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navbarClasses = [
    "navbar",
    isScrolled ? "navbar--scrolled" : "",
    isHidden ? "navbar--hidden" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={navbarClasses}>
      <div className="navbar__container">
        <div className="navbar__row">
          {/* Menu gauche */}
          <nav
            className="navbar__menu navbar__menu--left"
            aria-label="Primary navigation"
          >
            <ul className="navbar__list">
              {leftMenuItems.map((item) => (
                <li key={item.label} className="navbar__item">
                  <a href={item.href} className="navbar__link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logo */}
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

          {/* Menu droite */}
          <div className="navbar__menu navbar__menu--right">
            <nav aria-label="Secondary navigation">
              <ul className="navbar__list">
                {rightMenuItems.map((item) => (
                  <li key={item.label} className="navbar__item">
                    <a href={item.href} className="navbar__link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {ctaButton && (
              <a
                href={ctaButton.href || "#"}
                onClick={ctaButton.onClick}
                className="navbar__cta"
              >
                {ctaButton.label}
              </a>
            )}
          </div>

          {/* Burger */}
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

      {/* Menu mobile */}
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
            {allMenuItems.map((item, index) => (
              <li
                key={item.label}
                className="navbar__mobile-item"
                style={{
                  "--item-index": index,
                }}
              >
                <a
                  href={item.href}
                  className="navbar__mobile-link"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {ctaButton && (
          <a
            href={ctaButton.href || "#"}
            onClick={(e) => {
              closeMenu();

              if (ctaButton.onClick) {
                ctaButton.onClick(e);
              }
            }}
            className="navbar__mobile-cta"
          >
            {ctaButton.label}
          </a>
        )}
      </div>

      {/* Overlay */}
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

Navbar.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
  }).isRequired,

  leftMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),

  rightMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),

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