import Navbar from "../components/header/Navbar";
import CopyRight from "../components/footer/CopyRight";
import BoutonUp from "../components/BoutonUp";
import HeroAgent from "../components/agents/HeroAgent";
import Responsabilite from "../components/agents/Responsabilite";
import Info from "../components/agents/Info";
import Activiter from "../components/agents/Activiter";
import Difference from "../components/agents/Difference";
import Potentiel from "../components/agents/Potentiel";
import PotentielDescription from "../components/agents/PotentielDescription";
import Demo from "../components/agents/Demo";
import DemoVideos from "../components/agents/DemoVideos";
import AvisTitre from "../components/agents/AvisTitre";
import Avis from "../components/agents/Avis";
import Question from "../components/agents/Question";
import Conclusion from "../components/agents/Conclusion";
import SEO from "../components/SEO";

import avatar1 from "../assets/avatar-1.webp";
import avatar2 from "../assets/avatar-2.webp";
import avatar3 from "../assets/avatar-3.webp";
import avatar4 from "../assets/avatar-4.webp";
import avatar5 from "../assets/avatar-5.webp";
import avatar6 from "../assets/avatar-6.webp";
import avatar7 from "../assets/avatar-7.webp";
import avatar8 from "../assets/avatar-8.webp";

import { trackClick } from "../utils/trackClick";

import charlotteImage from "../assets/agents/charlotte-portrait.webp";
import differenceEthanScreenshot from "../assets/agents/difference-charlotte.webp";

import "../styles/AgentCharlotte.css";

function AgentCharlotte() {
  const logo = { text: "Agentova", href: "/" };

  const leftMenuItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/#services" },
    {
      label: "Agents",
      href: "/#agents",
      megaMenu: [
        { title: "Charlotte", image: avatar1, href: "/agents/agent-charlotte" },
        { title: "Ethan", image: avatar2, href: "/agents/agent-ethan" },
        { title: "Benoit", image: avatar3, href: "/agents/agent-benoit" },
        { title: "Amandine", image: avatar4, href: "/agents/agent-amandine" },
        { title: "Margot", image: avatar5, href: "/agents/agent-margot" },
        { title: "Arthur", image: avatar6, href: "/agents/agent-arthur" },
        { title: "Elisa", image: avatar7, href: "/agents/agent-elisa" },
        { title: "Samy", image: avatar8, href: "/agents/agent-samy" },
      ],
    },
  ];

  const rightMenuItems = [
    { label: "FAQS", href: "/#faqs" },
    { label: "Demo", href: "/#demo" },
  ];

  const ctaButton = {
    label: "Essayer Agentova",
    href: "https://agentova.ai?fpr=selon84",
    onClick: () => trackClick("navbar"),
  };

  const charlotteCards = [
    {
      title: "ADN créatif intégré",
      text: "Votre ton, votre style, appris",
    },
    {
      title: "Intelligence créative",
      text: "Conçue pour engager et convertir",
    },
    {
      title: "Multi-canal",
      text: "Instagram, LinkedIn, Facebook",
    },
    {
      title: "Prêt à diffuser",
      text: "Zéro template générique",
    },
  ];

  return (
    <div className="agent-page">
      <SEO
        title="Agent IA Création de Contenu & Marketing — Agentova"
        description="La seule IA avec laquelle vos clients veulent (vraiment) échanger. Charlotte crée du contenu qui ressemble à votre marque et qui engage vraiment. Découvrez l'agent IA créatif d'Agentova."
        path="/agents/agent-charlotte"
      />
      <Navbar
        logo={logo}
        leftMenuItems={leftMenuItems}
        rightMenuItems={rightMenuItems}
        ctaButton={ctaButton}
      />
      <HeroAgent
        image={charlotteImage}
        imageAlt="Agent Charlotte"
        name="Charlotte"
        cards={charlotteCards}
      />
      <Info />
      <Responsabilite />
      <Activiter />
      <Difference
        title='Ce qui différencie Ethan des autres "Agents IA" publicitaires'
        image={differenceEthanScreenshot}
        imageAlt="Aperçu du tableau de bord publicitaire d'Ethan"
      />
      <Potentiel />
      <PotentielDescription />
      <Demo />
      <DemoVideos />
      <AvisTitre />
      <Avis />
      <Question />
      <Conclusion />
      <CopyRight />
      <BoutonUp />
    </div>
  );
}

export default AgentCharlotte;
