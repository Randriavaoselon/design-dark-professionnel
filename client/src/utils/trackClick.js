import { TRACKER_API_URL } from "../config/tracker";

/**
 * Envoie un événement de clic au backend de tracking.
 * Ne bloque jamais l'action principale (ex: window.open) :
 * l'appel est "fire-and-forget" avec keepalive pour garantir
 * l'envoi même si la page perd le focus juste après.
 *
 * @param {string} source - identifiant unique du bouton/page (ex: "agent-arthur-navbar")
 */
export function trackClick(source) {
  try {
    fetch(TRACKER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source }),
      keepalive: true,
    }).catch((err) => {
      console.error("Tracking error:", err);
    });
  } catch (err) {
    console.error("Tracking error (sync):", err);
  }
}