import '../../styles/Footer.css';

const footerColumns = [
  {
    id: 1,
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', href: '#' },
      { label: 'Tarifs', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Mises à jour', href: '#' }
    ]
  },
  {
    id: 2,
    title: 'Entreprise',
    links: [
      { label: 'À propos', href: '#' },
      { label: 'Carrières', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Partenaires', href: '#' }
    ]
  },
  {
    id: 3,
    title: 'Ressources',
    links: [
      { label: 'Centre d\'aide', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Communauté', href: '#' }
    ]
  },
  {
    id: 4,
    title: 'Légal',
    links: [
      { label: 'Conditions d\'utilisation', href: '#' },
      { label: 'Confidentialité', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Mentions légales', href: '#' }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          {footerColumns.map((column) => (
            <div key={column.id} className="footer__col">
              <h3 className="footer__title">{column.title}</h3>
              <ul className="footer__list">
                {column.links.map((link, index) => (
                  <li key={index} className="footer__list-item">
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;