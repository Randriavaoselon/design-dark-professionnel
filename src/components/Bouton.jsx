import '../styles/BoutonComponent.css';

const BoutonComponent = ({ text, onClick, className, href = "#" }) => {
  return (
    <a 
      href={href}
      onClick={onClick}
      className={`btn-custom ${className || ''}`}
    >
      {text}
    </a>
  );
};

export default BoutonComponent;