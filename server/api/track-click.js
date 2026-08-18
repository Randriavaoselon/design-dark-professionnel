import nodemailer from "nodemailer";

// =========================
// Config
// =========================

// Liste des origines autorisées. Ajoute ici tes domaines de prod,
// tes URLs de preview Vercel, et localhost pour le dev.
// Tu peux aussi fournir une liste via la variable d'env ALLOWED_ORIGINS
// (séparées par des virgules), en plus de celles codées ici.
const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
];

const envOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const ALLOWED_ORIGINS = [...DEFAULT_ALLOWED_ORIGINS, ...envOrigins];

// Détermine l'origine à autoriser pour CETTE requête précise
function resolveAllowedOrigin(req) {
  const requestOrigin = req.headers.origin;

  if (!requestOrigin) return null;

  // Autorise les domaines/sous-domaines Vercel du projet automatiquement
  // (utile pour les URLs de preview générées à chaque déploiement)
  const isVercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(requestOrigin);

  if (ALLOWED_ORIGINS.includes(requestOrigin) || isVercelPreview) {
    return requestOrigin;
  }

  return null;
}

// Variables requises pour que l'API fonctionne
const requiredEnv = ["EMAIL_USER", "EMAIL_PASS", "NOTIFY_EMAIL"];

const missingEnv = requiredEnv.filter(
  (key) => !process.env[key] || process.env[key].trim() === ""
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =========================
// Handler Vercel (format attendu : export default)
// =========================

export default async function handler(req, res) {
  // CORS — origine résolue dynamiquement selon la requête entrante
  const allowedOrigin = resolveAllowedOrigin(req);

  if (allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Préflight CORS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Route racine simple (ping)
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Serveur Agentova opérationnel",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Méthode non autorisée",
    });
  }

  // Vérification des variables d'environnement (on ne peut pas faire
  // process.exit() en serverless : on renvoie une erreur claire à la place)
  if (missingEnv.length > 0) {
    console.error(
      `❌ Variables d'environnement manquantes : ${missingEnv.join(", ")}`
    );
    return res.status(500).json({
      success: false,
      error: "Configuration serveur incomplète (variables d'environnement manquantes)",
    });
  }

  try {
    const source = req.body?.source || "inconnu";

    console.log(`📩 Nouveau clic CTA : ${source}`);

    const currentDate = new Date().toLocaleString("fr-FR", {
      timeZone: "Indian/Antananarivo",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    await transporter.sendMail({
      from: `"Agentova Tracker" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `🔔 Nouveau clic CTA — ${source}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a; background-color: #ffffff;">
          <h2 style="margin-bottom: 20px;">🔔 Nouveau clic sur le bouton CTA</h2>
          <div style="padding: 16px; background-color: #f5f5f5; border-radius: 8px;">
            <p style="margin: 0 0 10px;"><strong>Page source :</strong> ${source}</p>
            <p style="margin: 0; color: #777; font-size: 13px;"><strong>Date :</strong> ${currentDate}</p>
          </div>
          <p style="margin-top: 24px; color: #999; font-size: 12px;">Notification automatique — Agentova Tracker</p>
        </div>
      `,
    });

    console.log("✅ Email de tracking envoyé");

    return res.status(200).json({
      success: true,
      message: "Tracking enregistré avec succès",
    });
  } catch (error) {
    console.error("❌ Erreur tracking clic :", error);

    return res.status(500).json({
      success: false,
      error: "Erreur lors de l'envoi de la notification",
    });
  }
}