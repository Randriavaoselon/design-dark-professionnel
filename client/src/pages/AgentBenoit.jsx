import { TrendingUp, ClipboardCheck, Target } from "lucide-react";

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

import benoitImage from "../assets/agents/benoit-portrait.webp";
import differenceBenoitScreenshot from "../assets/agents/differencie-benoit.png";

import "../styles/AgentCharlotte.css";

function AgentBenoit() {
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

  const benoitCards = [
    {
      title: "Plan marketing",
      text: "Roadmap 30 jours prête",
    },
    {
      title: "Services Pricing",
      text: "agentova, + 2 de plus lorem ipsum dolore suite",
    },
    {
      title: "Offre clarifiée",
      text: "Promesse + positionnement",
    },
    {
      title: "Stratégie contenu",
      text: "Angles et messages à tester",
    },
  ];

  const benoitActivities = [
    {
      icon: TrendingUp,
      title: "Passer devant tes concurrents sur Google",
      description:
        "Amandine analyse ton site et ceux de tes concurrents pour identifier précisément pourquoi ils sont mieux positionnés que toi. Elle te donne un plan clair pour les dépasser progressivement sur Google.",
    },
    {
      icon: ClipboardCheck,
      title: "Audit SEO clair et priorisé",
      description:
        "Elle réalise une analyse SEO complète de ton site et te dit quoi corriger en priorité. Pas une liste interminable, mais des actions concrètes qui ont un vrai impact.",
    },
    {
      icon: Target,
      title: "SEO orienté clients, pas trafic inutile",
      description:
        "Elle t'aide à produire des articles et pages optimisés pour Google, pensés pour être bien positionnés et utiles pour tes clients.",
    },
  ];

  const benoitFaqItems = [
    {
      question: "Que puis-je faire avec Agentova ?",
      answer:
        "Tout ce qui prend du temps au quotidien, Agentova peut l'automatiser. En connectant vos outils du quotidien à une équipe de 8 agents IA spécialisés, vous pouvez automatiser :\n.Service client : emails, Instagram, WhatsApp, support multicanal\n.Agent téléphonique : appels entrants et sortants automatisés\n.Création de contenu : posts, visuels, vidéos, campagnes\n.Gestion des réseaux sociaux : publication, programmation, engagement\n.Prospection : setting sur Instagram, LinkedIn, Facebook\n.Suivi de leads : qualification, relance automatique\n.Administratif : facturation, planning, coordination\n.Et plus encore...\nPour découvrir tout ce qu'il est possible de faire avec Agentova, n'hésitez pas à commencer votre essai gratuit de 7 jours. Pour toute question, notre agent spécialisé est disponible en bas à droite de votre écran.",
    },
    {
      question: "Avec quels outils Agentova peut-il s'intégrer ?",
      answer:
        "Agentova s'intègre à plus de 3 000 plateformes externes, incluant les outils les plus utilisés du marché (CRM, messageries, réseaux sociaux, outils marketing, comptabilité, etc.). Votre outil favori fait très certainement partie de notre catalogue d'intégrations.\n→ Consultez la page des intégrations pour voir la liste complète.",
    },
    {
      question: "Comment Agentova protège-t-il mes données ?",
      answer:
        "La sécurité de vos données est notre priorité absolue. Agentova applique les standards de sécurité les plus stricts :\n.Conformité RGPD : respect total de la réglementation européenne\n.Chiffrement SSL/TLS : protection de bout en bout\n.Certifications : SOC 2 Type II, CCPA, ISO 27001\n.Hébergement sécurisé : infrastructure cloud de niveau entreprise\n.Contrôle d'accès : authentification multi-facteurs (MFA)\nVos données ne sont jamais partagées avec des tiers et restent votre propriété exclusive.",
    },
    {
      question: "Puis-je inviter mon équipe sur Agentova ?",
      answer:
        "Absolument. Agentova fonctionne avec un système de workspaces collaboratifs. Chaque membre peut disposer de son propre espace de travail ou rejoindre un workspace existant pour :\n.Collaborer en temps réel\n.Automatiser des tâches en équipe\n.Suivre les projets collectivement\n.Centraliser les échanges\n→ Découvrez le fonctionnement des workspaces sur notre page dédiée.",
    },
    {
      question: "Puis-je tester avant de m'engager ?",
      answer:
        "Oui, nous proposons 7 jours d'essai gratuit sans engagement et sans carte bancaire requise. Vous pouvez découvrir l'ensemble des fonctionnalités d'Agentova et annuler à tout moment si la solution ne correspond pas à vos attentes.\n→ Commencez votre essai gratuit dès maintenant.",
    },
    {
      question: "Y a-t-il un programme d'affiliation ?",
      answer:
        "Oui, Agentova propose un programme d'affiliation avantageux. En rejoignant notre programme, vous gagnez 30% de commission récurrente à vie sur chaque client parrainé. Chaque fois que vous aidez un entrepreneur à sortir de l'opérationnel grâce à notre équipe d'agents IA, vous êtes rémunéré durablement.\n→ Inscrivez-vous au programme d'affiliation ici.",
    },
  ];

  return (
    <div className="agent-page">
      <SEO
        title="Stratégie Marketing IA pour Gagner des Parts de Marché — Agentova"
        description="Benoit est l'agent IA d'Agentova qui conçoit votre stratégie marketing : positionnement, plan d'action et recommandations pensés pour votre croissance."
        path="/agents/agent-benoit"
      />
      <Navbar
        logo={logo}
        leftMenuItems={leftMenuItems}
        rightMenuItems={rightMenuItems}
        ctaButton={ctaButton}
      />
      <HeroAgent
        image={benoitImage}
        imageAlt="Agent Benoit"
        name="Benoit"
        cards={benoitCards}
      />
      <Info />
      <Responsabilite
        title="Prompter sans aucune compétence technique."
        buttonLabel="Essayer maintenant"
      />
      <ActiviterAgent activities={benoitActivities} />
      <Difference
        title="Ce qui différencie Agentova des autres “Agents IA”."
        image={differenceBenoitScreenshot}
        imageAlt="Aperçu du tableau de bord recrutement de Benoit"
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
        faqItems={benoitFaqItems}
        trackingSource="agent-benoit-question"
      />
      <Conclusion />
      <CopyRight />
      <BoutonUp />
    </div>
  );
}

export default AgentBenoit;
