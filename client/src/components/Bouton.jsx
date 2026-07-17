import { memo } from "react";
import PropTypes from "prop-types";
import "../styles/BoutonComponent.css";

const BoutonComponent = memo(function BoutonComponent({
  text,
  onClick,
  className = "",
  href = "#",
}) {
  return (
    <a href={href} onClick={onClick} className={`btn-custom ${className}`}>
      {text}
    </a>
  );
});

BoutonComponent.propTypes = {
  text: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  href: PropTypes.string,
};

export default BoutonComponent;