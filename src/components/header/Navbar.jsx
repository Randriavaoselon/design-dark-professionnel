import { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/Navbar.css";

function Navbar({ logo, leftMenuItems, rightMenuItems, ctaButton, className }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allMenuItems = [...leftMenuItems, ...rightMenuItems];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <section className={`navbar ${className || ""}`.trim()}>
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
