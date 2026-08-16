import { Target, TrendingUp, UserCheck } from "lucide-react";

import { Mail, Bot, Zap } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

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

import arthurImage from "../assets/agents/arthur-portrait.webp";
import differenceArthurScreenshot from "../assets/agents/differencie-arthur.png";

import "../styles/AgentCharlotte.css";

function AgentArthur() {
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
        {
          title: "Arthur",
          image: avatar6,
          href: "/agents/agent-arthur",
        },
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
  };

  const arthurCards = [
    {
      icon: Mail,
      title: "Gestion de ta boîte mail",
      text: "Disponible 24/7",
    },
    {
      icon: FaWhatsapp,
      title: "Gestion complète de WhatsApp",
      text: "Suivi et réponses automatisés",
    },
    {
      icon: Bot,
      title: "Chatbot IA sur ton site",
      text: "Assistant intelligent intégré",
    },
    {
      icon: Zap,
      title: "Réponses clients",
      text: "Instantanées, à toute heure",
    },
  ];

  const arthurActivities = [
    {
      icon: Target,
      title: "Prospection 2.0 : démarchage automatisé",
      description:
        "À chaque commentaire, lead ou interaction, Arthur contacte et qualifie automatiquement le prospect.",
    },
    {
      icon: TrendingUp,
      title: "+41% de conversions sur les conversations entrantes",
      description:
        "Arthur répond instantanément sur tous vos canaux, sans jamais laisser un lead sans réponse.",
    },
    {
      icon: UserCheck,
      title: "Mode humain activé",
      description:
        "Arthur adopte votre ton, vos mots et votre manière de vendre pour des échanges naturels et crédibles.",
    },
  ];

  const arthurFaqItems = [
    {
      question: "À qui s'adresse Arthur ?",
      answer:
        "Arthur est conçu pour les entrepreneurs, coachs, consultants, agences et e-commerçants qui veulent convertir plus de leads sans passer leurs journées à répondre aux messages. Si vous recevez des DMs, des commentaires ou des leads entrants et que vous n'avez pas le temps de tous les traiter rapidement, Arthur est fait pour vous.",
    },
    {
      question: "Sur quels canaux Arthur peut-il intervenir ?",
      answer:
        "Arthur fonctionne sur WhatsApp, Instagram, Facebook Messenger et bientôt LinkedIn via les APIs officielles de Meta. Vous gérez tous vos leads depuis une seule interface, que ce soit pour vos funnels publicitaires, vos posts organiques, vos commentaires ou vos DMs directs. Bonus : Arthur peut aussi démarcher automatiquement les prospects qui interagissent avec vos publications (commentaires, likes, partages) en leur envoyant un message personnalisé.",
    },
    {
      question: "Y a-t-il un risque de se faire bannir par Instagram, WhatsApp ou Facebook ?",
      answer:
        "Aucun risque. Agentova est partenaire officiel Meta Business. Nous utilisons exclusivement les APIs officielles et respectons toutes les directives de Meta pour garantir la sécurité de vos comptes.",
    },
    {
      question: "Combien de temps faut-il pour configurer Arthur ?",
      answer:
        "La mise en place initiale prend entre 15 et 30 minutes. Vous connectez vos comptes, définissez vos critères de qualification et votre style de conversation. Arthur commence à travailler immédiatement et apprend en continu de vos échanges pour s'améliorer.",
    },
    {
      question: "Mes prospects vont-ils se rendre compte qu'ils parlent à une IA ?",
      answer:
        "Non, c'est justement notre expertise. Arthur répond avec des délais variables (pas instantanément comme un robot), fait des pauses naturelles dans la conversation, utilise votre ton et peut même envoyer des messages vocaux pré-enregistrés avec votre vraie voix. Tout est pensé pour que l'échange soit naturel et indiscernable d'une vraie conversation avec vous.",
    },
    {
      question: "Puis-je garder le contrôle sur les conversations ?",
      answer:
        "Absolument. Vous pouvez intervenir à tout moment dans n'importe quelle conversation. Arthur est formé pour reconnaître les situations complexes et peut vous notifier immédiatement pour que vous preniez le relais si nécessaire. Vous gardez toujours le contrôle total.",
    },
    {
      question: "Puis-je mettre Arthur en pause sur une conversation ?",
      answer:
        "Oui, vous avez un contrôle complet. Vous pouvez désactiver Arthur manuellement sur n'importe quelle conversation en 1 clic. Vous pouvez aussi lui donner des instructions pour qu'il se mette en pause automatiquement dans certaines situations (par exemple après un rendez-vous pris, ou si le prospect demande à parler à un humain). Et vous pouvez reprendre la main à tout moment en écrivant directement dans la conversation.",
    },
    {
      question: "Arthur peut-il automatiser des actions suite à des déclencheurs précis ?",
      answer:
        "Oui. Arthur peut mettre en place des séquences d'actions automatisées suite à des événements précis : envoi automatique d'un e-book quand quelqu'un commente \"GO\", message de bienvenue pour chaque nouvel abonné, relance automatique après 48h sans réponse, notification d'équipe quand un lead est qualifié, et bien plus selon vos besoins. Vous créez ces automatisations simplement, sans code ni complexité technique.",
    },
    {
      question: "Arthur peut-il m'aider à générer plus de leads ?",
      answer:
        "Oui. Arthur ne se limite pas à gérer vos conversations. Il peut aussi créer des parcours d'acquisition pour capter plus de leads : suite à une interaction sur votre site web, après un commentaire sur vos réseaux sociaux, via des formulaires automatisés, grâce à des chatbots intelligents. Tout est pensé pour transformer chaque interaction en opportunité commerciale.",
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
        image={arthurImage}
        imageAlt="Agent Arthur"
        name="Arthur"
        cards={arthurCards}
      />
      <Info />
      <Responsabilite
        title="Les ventes qui te font grandir, pas juste closer."
        buttonLabel="Essayer maintenant"
      />
      <ActiviterAgent activities={arthurActivities} />
      <Difference
        title="Ce qui différencie Agentova des autres “Agents IA”."
        image={differenceArthurScreenshot}
        imageAlt="Aperçu du tableau de bord recrutement d'Arthur"
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
        faqItems={arthurFaqItems}
      />
      <Conclusion />
      <CopyRight />
      <BoutonUp />
    </div>
  );
}

export default AgentArthur;