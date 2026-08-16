import Home from "../components/Home";
import Stats from "../components/Stats";
import SolutionTitre from "../components/SolutionTitre";
import Cooptation from "../components/Cooptation";
import Recrutement from "../components/Recrutement";
import OnboardingHero from "../components/Onboardinghero";
import Works from "../components/WorksTitre";
import WorkDetails from "../components/WorkDetails";
import Opportunity from "../components/Opportunity";
import Overview from "../components/Overview";
import OverviewTwo from "../components/OverviewTwo";
import OverviewTree from "../components/OverviewTree";
import WorksTwo from "../components/WorksTwo";
import SectionNetwork from "../components/SectionNetwork";
import NetworkGraph from "../components/NetworkGraph";
import SectionChoose from "../components/SectionChoose";
import Resume from "../components/Resume";
import CopyRight from "../components/footer/CopyRight";
import BoutonUp from "../components/BoutonUp";
import SidebarMenu from "../components/Sidebarmenu";
import BannierInfo from "../components/Bannierinfo";

import iconeStat from "../assets/icone-stat.svg";

function HomePage() {
  return (
    <>
      <Home />
      <BannierInfo />
      <Stats
        title="Votre équipe perd-elle du temps sur des tâches répétitives ?"
        belowIconSrc={iconeStat}
        imageAlt="icone stat"
      />

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
      <SidebarMenu />
    </>
  );
}

export default HomePage;