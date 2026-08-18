import { Mail, MousePointerClick, Inbox } from "lucide-react";

import Navbar from "../components/header/Navbar";
import CopyRight from "../components/footer/CopyRight";
import BoutonUp from "../components/BoutonUp";
import HeroAgent from "../components/agents/HeroAgent";
import Responsabilite from "../components/agents/Responsabilite";
import Info from "../components/agents/Info";
import Difference from "../components/agents/Difference";
import Potentiel from "../components/agents/Potentiel";
import PotentielDescription from "../components/agents/PotentielDescription";
import AvisTitre from "../components/agents/AvisTitre";
import Avis from "../components/agents/Avis";
import Question from "../components/agents/Question";
import Conclusion from "../components/agents/Conclusion";
import ActiviterAgent from "../components/agents/ActiviterAgents";

import avatar1 from "../assets/avatar-1.webp";
import avatar2 from "../assets/avatar-2.webp";
import avatar3 from "../assets/avatar-3.webp";
import avatar4 from "../assets/avatar-4.webp";
import avatar5 from "../assets/avatar-5.webp";
import avatar6 from "../assets/avatar-6.webp";
import avatar7 from "../assets/avatar-7.webp";
import avatar8 from "../assets/avatar-8.webp";

import { trackClick } from "../utils/trackClick"; 

import margotImage from "../assets/agents/margot-portrait.webp";
import differenceMargotScreenshot from "../assets/agents/differencie-margot.png";

import "../styles/AgentCharlotte.css";

function AgentMargot() {
  const logo = { text: "Agentova", href: "/" };

  const leftMenuItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/#services" },
    {
      label: "Agents",
      href: "/#agents",
      megaMenu: [
        {
          title: "Charlotte",
          image: avatar1,
          href: "/agents/agent-charlotte",
        },
        { title: "Ethan", image: avatar2, href: "/agents/agent-ethan" },
        { title: "Benoit", image: avatar3, href: "/agents/agent-benoit" },
        {
          title: "Amandine",
          image: avatar4,
          href: "/agents/agent-amandine",
        },
        {
          title: "Margot",
          image: avatar5,
          href: "/agents/agent-margot",
        },
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

  const margotCards = [
    {
      title: "Gestion de ta boîte mail",
      text: "Disponible 24/7",
    },
    {
      title: "Gestion complète de WhatsApp",
      text: "Messages traités automatiquement",
    },
    {
      title: "Chatbot IA sur ton site",
      text: "Toujours prêt à répondre",
    },
    {
      title: "Réponses clients",
      text: "Instantanées, à toute heure",
    },
  ];

  const margotActivities = [
    {
      icon: Mail,
      title: "+2h gagnées chaque jour sur vos emails",
      description:
        "Margot lit, rédige et prépare vos réponses automatiquement.",
    },
    {
      icon: MousePointerClick,
      title: "Jusqu'à +47% d'interactions sur votre site",
      description:
        "Visiteurs guidés, questions traitées, formulaires récupérés.",
    },
    {
      icon: Inbox,
      title: "Une inbox structurée sans effort",
      description:
        "Margot trie, classe et organise pour vous.",
    },
  ];

  const margotFaqItems = [
    {
      question: "Qu'est-ce que Margot et comment fonctionne-t-elle ?",
      answer:
        "Margot est votre assistante IA disponible 24/7 qui gère vos emails, messages et support client. Elle trie, rédige et agit sur vos communications pour que vous puissiez vous concentrer sur l'essentiel, pas sur l'administratif.\nVoici comment elle fonctionne :\n.Présente partout : Margot se connecte directement à votre boîte mail (Gmail, Outlook, ou toute autre messagerie professionnelle) et au chatbot de votre site web. Elle est aussi accessible via notre interface web sur app.agentova.ai\n.Comprend votre style : Margot apprend votre ton et votre façon de communiquer en analysant vos messages passés. Elle ne rédige pas simplement des réponses, elle les écrit comme vous le feriez\n.Gère les réponses et les actions : Que ce soit pour répondre à un prospect, programmer un rappel ou transférer une demande urgente, Margot prépare des réponses intelligentes en un clic\n.Chatbot sur votre site : Margot peut aussi créer et gérer un chatbot sur votre site web pour capturer automatiquement vos leads visiteurs et les qualifier en temps réel\n.Automatisations personnalisées : Définissez des règles comme \"toujours répondre aux demandes de devis sous 5 minutes\" ou \"transférer les messages urgents à mon équipe\" et Margot agira en conséquence, automatiquement ou avec votre validation\n.Conçue pour la rapidité : Tout est optimisé pour les utilisateurs exigeants : réponses instantanées, gestion centralisée, rappels intelligents et bien plus\nEn résumé, Margot, c'est comme avoir une responsable support et relations client dans votre boîte mail et sur votre site, sauf qu'elle ne dort jamais.",
    },
    {
      question: "Où puis-je accéder à Margot ?",
      answer:
        "Margot est présente directement dans votre boîte mail, quelle que soit votre messagerie professionnelle. Vous la retrouvez en train de rédiger vos réponses, gérer vos messages et organiser votre communication (aussi bien sur mobile que desktop).\nElle gère également le chatbot de votre site web et dispose d'une interface web complète sur app.agentova.ai, où vous bénéficiez de toute sa puissance dans un espace de travail dédié.\nQue vous soyez sur votre boîte mail, votre site web, ou notre application, Margot est toujours à portée de clic, prête à vous libérer de la gestion des messages.",
    },
    {
      question: "Margot envoie-t-elle des emails automatiquement ?",
      answer:
        "Non, Margot n'envoie jamais d'email sans votre validation. Elle prépare des brouillons que vous pouvez relire, modifier et envoyer quand vous êtes prêt. Vous gardez le contrôle total à tout moment.",
    },
    {
      question: "Dois-je installer quelque chose ?",
      answer:
        "Aucune installation nécessaire. Margot est une plateforme cloud accessible en ligne via votre navigateur web et vos applications de messagerie, ce qui la rend accessible depuis n'importe où.",
    },
    {
      question: "Margot peut-elle créer un chatbot sur mon site web ?",
      answer:
        "Oui. Margot peut installer et gérer un chatbot intelligent sur votre site pour :\n.Répondre aux questions des visiteurs 24/7\n.Capturer automatiquement les informations de contact\n.Qualifier les leads en temps réel\n.Transférer les demandes urgentes à votre équipe\nTout est configuré en quelques clics, sans code ni complexité technique.",
    },
    {
      question: "Margot peut-elle récupérer les leads de mon site web ?",
      answer:
        "Oui. Grâce au chatbot intégré, Margot capte automatiquement les coordonnées de vos visiteurs et les qualifie selon vos critères. Chaque lead est ensuite centralisé dans votre dashboard Agentova pour un suivi optimal.",
    },
    {
      question: "Avec quelles boîtes mail Margot peut-elle se connecter ?",
      answer:
        "Margot se connecte à toutes les boîtes mail professionnelles : Gmail, Outlook, et toute autre messagerie compatible IMAP/SMTP. Elle s'intègre également au chatbot de votre site web pour une gestion centralisée de toutes vos communications.",
    },
    {
      question: "Comment Margot apprend-elle mon style de communication ?",
      answer:
        "Margot analyse vos emails et messages passés pour comprendre votre ton, votre vocabulaire et votre façon de structurer vos réponses. Plus vous l'utilisez, plus elle devient précise et fidèle à votre style.",
    },
  ];

  return (
    <div className="agent-page">
      <Navbar
        logo={logo}
        leftMenuItems={leftMenuItems}
        rightMenuItems={rightMenuItems}
        ctaButton={ctaButton}
      />
      <HeroAgent
        image={margotImage}
        imageAlt="Agent Margot"
        name="Margot"
        cards={margotCards}
      />
      <Info />
      <Responsabilite
        title="Le support qui te fait scaler, pas juste répondre."
        buttonLabel="Essayer maintenant"
      />
      <ActiviterAgent activities={margotActivities} />
      <Difference
        title="Ce qui différencie Agentova des autres “Agents IA”."
        image={differenceMargotScreenshot}
        imageAlt="Aperçu du tableau de bord facturation de Margot"
        buttonLabel="Essayer maintenant"
      />
      <Potentiel />
      <PotentielDescription />
      <AvisTitre />
      <Avis />
      <Question
        title="Les questions fréquentes"
        description={
          <>
            Vous ne trouvez pas la réponse à vos questions ?
            <br />
            Contactez-nous ici ou réserver une démo.
          </>
        }
        faqItems={margotFaqItems}
        trackingSource="agent-margot-question"
      />
      <Conclusion />
      <CopyRight />
      <BoutonUp />
    </div>
  );
}

export default AgentMargot;