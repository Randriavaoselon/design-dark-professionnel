import '../../styles/Footer.css';

const footerColumns = [
  {
    id: 1,
    title: 'AI Agent',
    links: [
      { label: 'Elisa', href: '/agents/agent-elisa' },
      { label: 'Benoit', href: '/agents/agent-benoit' },
      { label: 'Margot', href: '/agents/agent-margot' },
      { label: 'Ethan', href: '/agents/agent-ethan' },
      { label: 'Arthur', href: '/agents/agent-arthur' },
      { label: 'Charlot', href: '/agents/agent-charlotte' },
      { label: 'Samy', href: '/agents/agent-samy' },
      { label: 'Amandine', href: '/agents/agent-amandine' }
    ]
  },
  {
    id: 2,
    title: 'Nos solutions',
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Agents', href: '#agents' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Demo', href: '#demo' }
    ]
  },

  {
    id: 3,
    title: 'Navigation',
    links: [
      { label: 'AI Brain', href: 'https://www.agentova.ai/brain-ai' },
      { label: 'Integrations', href: 'https://www.agentova.ai/integrations' },
      { label: 'Affiliate', href: 'https://www.agentova.ai/affiliate' },
      { label: 'Download App', href: 'https://www.agentova.ai/download' },
      { label: 'Help', href: 'https://agentova.ai/help' },
    ]
  },
  {
    id: 4,
    title: 'Légals',
    links: [
      { label: 'Mentions légales', href: 'https://www.agentova.ai/legal/legal-notice' },
      { label: 'Confidentialité', href: 'https://www.agentova.ai/legal/privacy-policy' },
      { label: 'Cookies', href: 'https://www.agentova.ai/legal/cookie-policy' },
      { label: 'CGU', href: 'https://www.agentova.ai/legal/terms-of-use' },
      { label: 'CGV', href: 'https://www.agentova.ai/legal/terms-of-sale' },
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