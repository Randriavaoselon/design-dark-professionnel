import Navbar from "./components/header/Navbar";
import Home from "./components/Home";
import Stats from "./components/Stats";
import SolutionTitre from "./components/SolutionTitre";
import Cooptation from "./components/Cooptation";
import Recrutement from "./components/Recrutement";
import OnboardingHero from "./components/Onboardinghero";
import Works from "./components/WorksTitre";
import WorkDetails from "./components/WorkDetails";
import Opportunity from "./components/Opportunity";
import Overview from "./components/Overview";
import OverviewTwo from "./components/OverviewTwo";
import OverviewTree from "./components/OverviewTree";
import WorksTwo from "./components/WorksTwo";
import SectionNetwork from "./components/SectionNetwork";
import NetworkGraph from "./components/NetworkGraph";
import SectionChoose from "./components/SectionChoose";
import Resume from "./components/Resume";
import CopyRight from "./components/footer/CopyRight";
import BoutonUp from "./components/BoutonUp";

import "./App.css";

function App() {
  // =========== Navbar ==========================

  const logo = { text: "Avenir-Tech", href: "/" };

  const leftMenuItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "À propos", href: "/a-propos" },
  ];

  const rightMenuItems = [
    { label: "Tarifs", href: "/tarifs" },
    { label: "Contact", href: "/contact" },
  ];

  const ctaButton = {
    label: "Commencer",
    href: "/commencer",
  };

  return (
    <div className="app">
      <Navbar
        logo={logo}
        leftMenuItems={leftMenuItems}
        rightMenuItems={rightMenuItems}
        ctaButton={ctaButton}
      />

      <Home />
      <Stats title="Bienvenue sur mon site" />
      <SolutionTitre />
      <Cooptation />
      <Recrutement />
      <OnboardingHero />
      <Works />
      <WorkDetails />
      <Opportunity />
      <Overview />
      <OverviewTwo />
      <OverviewTree />
      <WorksTwo />
      <SectionNetwork />
      <NetworkGraph />
      <SectionChoose />
      <Resume />
      <CopyRight />
      <BoutonUp />
    </div>
  );
}

export default App;
