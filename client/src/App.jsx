import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import HomePage from "./pages/HomePage";
import AgentCharlotte from "./pages/AgentCharlotte";
import AgentEthan from "./pages/AgentEthan";
import AgentBenoit from "./pages/AgentBenoit";
import AgentAmandine from "./pages/AgentAmandine";
import AgentMargot from "./pages/AgentMargot";
import AgentElisa from "./pages/AgentElisa";

import avatar1 from "./assets/avatar-1.webp";
import avatar2 from "./assets/avatar-2.webp";
import avatar3 from "./assets/avatar-3.webp";
import avatar4 from "./assets/avatar-4.webp";
import avatar5 from "./assets/avatar-5.webp";
import avatar6 from "./assets/avatar-6.webp";
import avatar7 from "./assets/avatar-7.webp";
import avatar8 from "./assets/avatar-8.webp";

import "./App.css";
import AgentArthur from "./pages/AgentArthur";
import AgentSamy from "./pages/AgentSamy";

function App() {
  // =========== Navbar ==========================

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
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar
          logo={logo}
          leftMenuItems={leftMenuItems}
          rightMenuItems={rightMenuItems}
          ctaButton={ctaButton}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agents/agent-charlotte" element={<AgentCharlotte />} />
          <Route path="/agents/agent-ethan" element={<AgentEthan />} />
          <Route path="/agents/agent-benoit" element={<AgentBenoit />} />
          <Route path="/agents/agent-amandine" element={<AgentAmandine />} />
          <Route path="/agents/agent-margot" element={<AgentMargot />} />
          <Route path="/agents/agent-arthur" element={<AgentArthur />} />
          <Route path="/agents/agent-elisa" element={<AgentElisa />} /> 
          <Route path="/agents/agent-samy" element={<AgentSamy />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;