import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

// Signale à Puppeteer (prérendu) que le rendu React est terminé
if (typeof document !== "undefined") {
  setTimeout(() => {
    document.dispatchEvent(new Event("prerender-ready"));
  }, 300);
}