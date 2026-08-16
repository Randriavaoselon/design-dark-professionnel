import PropTypes from "prop-types";
import "../../styles/MegaMenu.css";

export function MegaMenu({
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onCardClick,
  heading,
  subheading,
  featured,
}) {
  if (!items || items.length === 0) return null;

  const cardCount = Math.min(items.length, 4);
  const hasFeatured = Boolean(featured);

  return (
    <div
      className={`mega-menu ${isOpen ? "mega-menu--open" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        "--card-count": cardCount,
        "--has-featured": hasFeatured ? 1 : 0,
      }}
    >
      <div className="mega-menu__body">
        <div className="mega-menu__main">
          {(heading || subheading) && (
            <div className="mega-menu__header">
              {heading && (
                <p className="mega-menu__heading">{heading}</p>
              )}

              {subheading && (
                <p className="mega-menu__subheading">{subheading}</p>
              )}
            </div>
          )}

          <div className="mega-menu__grid">
            {items.map((card) => (
              <a
                key={card.title}
                href={card.href || "#"}
                className="mega-menu__card"
                onClick={onCardClick}
              >
                <span className="mega-menu__card-image">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                  />

                  {card.badge && (
                    <span className="mega-menu__card-badge">
                      {card.badge}
                    </span>
                  )}
                </span>

                <span className="mega-menu__card-title">
                  {card.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {featured && (
          <div className="mega-menu__featured">
            <span className="mega-menu__featured-eyebrow">
              {featured.eyebrow}
            </span>

            <h4 className="mega-menu__featured-title">
              {featured.title}
            </h4>

            <p className="mega-menu__featured-text">
              {featured.text}
            </p>

            <a
              href={featured.href || "#"}
              className="mega-menu__featured-cta"
              onClick={onCardClick}
            >
              {featured.ctaLabel}

              <span
                className="mega-menu__featured-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function MegaMenuMobile({
  items,
  isOpen,
  onToggle,
  label,
  onCardClick,
}) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <button
        type="button"
        className={`mega-menu-mobile__toggle ${
          isOpen ? "is-open" : ""
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {label}
        <span
          className="mega-menu-mobile__caret"
          aria-hidden="true"
        />
      </button>

      <div
        className={`mega-menu-mobile__submenu ${
          isOpen ? "mega-menu-mobile__submenu--open" : ""
        }`}
      >
        {items.map((card) => (
          <a
            key={card.title}
            href={card.href || "#"}
            className="mega-menu-mobile__card"
            onClick={onCardClick}
          >
            <span className="mega-menu-mobile__card-image">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
              />

              {card.badge && (
                <span className="mega-menu-mobile__card-badge">
                  {card.badge}
                </span>
              )}
            </span>

            <span className="mega-menu-mobile__card-title">
              {card.title}
            </span>
          </a>
        ))}
      </div>
    </>
  );
}

const megaMenuItemShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  href: PropTypes.string,
  badge: PropTypes.string,
});

MegaMenu.propTypes = {
  items: PropTypes.arrayOf(megaMenuItemShape),
  isOpen: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onCardClick: PropTypes.func,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  featured: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
    ctaLabel: PropTypes.string,
  }),
};

MegaMenu.defaultProps = {
  items: [],
  isOpen: false,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  onCardClick: undefined,
  heading: "",
  subheading: "",
  featured: null,
};

MegaMenuMobile.propTypes = {
  items: PropTypes.arrayOf(megaMenuItemShape),
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  label: PropTypes.string.isRequired,
  onCardClick: PropTypes.func,
};

MegaMenuMobile.defaultProps = {
  items: [],
  isOpen: false,
  onToggle: undefined,
  onCardClick: undefined,
};