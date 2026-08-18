import { Megaphone, BarChart3, GraduationCap } from "lucide-react";

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

import ethanImage from "../assets/agents/ethan-portrait.webp";
import differenceEthanScreenshot from "../assets/agents/differencie-ethan.png";

import "../styles/AgentCharlotte.css";

function AgentEthan() {
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

  const ethanCards = [
    {
      title: "Structure pub",
      text: "Compte propre, objectifs clairs",
    },
    {
      title: "Analyse KPIs",
      text: "CTR, CPA, ROAS expliqués",
    },
    {
      title: "Services Pricing",
      text: "agentova, + 2 de plus lorem",
    },
    {
      title: "Plan de tests",
      text: "Créas et ciblage optimisés",
    },
  ];

  const ethanActivities = [
    {
      icon: Megaphone,
      title: "Lancer des publicités sans gaspiller ton budget",
      description:
        "Ethan te guide pas à pas pour lancer tes premières publicités sur Google, Facebook ou Instagram, même si tu débutes complètement.",
    },
    {
      icon: BarChart3,
      title: "Comprendre tes statistiques simplement",
      description:
        "Il analyse tes données publicitaires et t'explique clairement ce qui fonctionne, ce qui ne fonctionne pas et pourquoi, sans jargon compliqué.",
    },
    {
      icon: GraduationCap,
      title: "Mentor publicitaire pour dirigeants",
      description:
        "Ethan agit comme un coach qui t'accompagne dans tes décisions publicitaires, en t'expliquant quoi faire et quand le faire.",
    },
  ];

  const ethanFaqItems = [
    {
      question: "Que puis-je faire avec Agentova ?",
      answer:
        "Tout ce qui prend du temps au quotidien, Agentova peut l'automatiser. En connectant vos outils du quotidien à une équipe de 8 agents IA spécialisés, vous pouvez automatiser le service client, les appels téléphoniques, la création de contenu, la gestion des réseaux sociaux, la prospection, le suivi des leads, l'administratif et bien plus encore.",
    },
    {
      question: "Avec quels outils Agentova peut-il s'intégrer ?",
      answer:
        "Agentova s'intègre à plus de 3 000 plateformes externes, notamment les CRM, messageries, réseaux sociaux, outils marketing, solutions de comptabilité et bien d'autres. Votre outil favori fait très certainement partie de notre catalogue d'intégrations.",
    },
    {
      question: "Comment Agentova protège-t-il mes données ?",
      answer:
        "La sécurité de vos données est une priorité. Agentova applique des standards de sécurité stricts avec la conformité RGPD, le chiffrement SSL/TLS, des certifications comme SOC 2 Type II, CCPA et ISO 27001, une infrastructure cloud sécurisée et un contrôle d'accès avec authentification multi-facteurs (MFA). Vos données restent votre propriété.",
    },
    {
      question: "Puis-je inviter mon équipe sur Agentova ?",
      answer:
        "Absolument. Agentova fonctionne avec un système de workspaces collaboratifs. Chaque membre peut disposer de son propre espace de travail ou rejoindre un workspace existant afin de collaborer en temps réel, automatiser des tâches en équipe, suivre les projets et centraliser les échanges.",
    },
    {
      question: "Puis-je tester Agentova avant de m'engager ?",
      answer:
        "Oui. Agentova propose 7 jours d'essai gratuit, sans engagement et sans carte bancaire requise. Vous pouvez découvrir les fonctionnalités de la solution et annuler à tout moment si elle ne correspond pas à vos attentes.",
    },
    {
      question: "Y a-t-il un programme d'affiliation ?",
      answer:
        "Oui. Agentova propose un programme d'affiliation avec 30 % de commission récurrente à vie sur chaque client parrainé. Vous pouvez ainsi être rémunéré durablement en recommandant Agentova aux entrepreneurs qui souhaitent automatiser leur activité grâce aux agents IA.",
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
        image={ethanImage}
        imageAlt="Agent Ethan"
        name="Ethan"
        cards={ethanCards}
      />
      <Info />
      <Responsabilite
        title="Prompter sans aucune compétence technique."
        buttonLabel="Essayer maintenant"
      />
      <ActiviterAgent activities={ethanActivities} />
      <Difference
        title="Ce qui différencie Agentova des autres “Agents IA”."
        image={differenceEthanScreenshot}
        imageAlt="Aperçu du tableau de bord publicitaire d'Ethan"
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
        faqItems={ethanFaqItems}
        trackingSource="agent-ethan-question"
      />
      <Conclusion />
      <CopyRight />
      <BoutonUp />
    </div>
  );
}

export default AgentEthan;
