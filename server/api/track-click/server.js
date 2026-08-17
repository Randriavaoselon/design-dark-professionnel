import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Charger les variables d'environnement
dotenv.config({ path: "../../.env" });

// Vérification des variables nécessaires
const requiredEnv = [
  "EMAIL_USER",
  "EMAIL_PASS",
  "NOTIFY_EMAIL",
];

const missingEnv = requiredEnv.filter(
  (key) => !process.env[key] || process.env[key].trim() === ""
);

if (missingEnv.length > 0) {
  console.error(
    `❌ Variables d'environnement manquantes : ${missingEnv.join(", ")}`
  );
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

const ALLOWED_ORIGIN =
  process.env.ALLOWED_ORIGIN || "http://localhost:5173";

// =========================
// CORS
// =========================

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// =========================
// Middleware
// =========================

app.use(express.json());

// =========================
// Nodemailer / Gmail
// =========================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Vérifier la connexion SMTP au démarrage
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Erreur de connexion Gmail :", error.message);
  } else {
    console.log("✅ Connexion Gmail/Nodemailer réussie");
  }
});

// =========================
// Route principale
// =========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Serveur Agentova opérationnel",
  });
});

// =========================
// Tracking CTA
// =========================

app.post("/api/track-click", async (req, res) => {
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
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 24px;
            color: #1a1a1a;
            background-color: #ffffff;
          "
        >

          <h2 style="margin-bottom: 20px;">
            🔔 Nouveau clic sur le bouton CTA
          </h2>

          <div
            style="
              padding: 16px;
              background-color: #f5f5f5;
              border-radius: 8px;
            "
          >
            <p style="margin: 0 0 10px;">
              <strong>Page source :</strong>
              ${source}
            </p>

            <p
              style="
                margin: 0;
                color: #777;
                font-size: 13px;
              "
            >
              <strong>Date :</strong>
              ${currentDate}
            </p>
          </div>

          <p
            style="
              margin-top: 24px;
              color: #999;
              font-size: 12px;
            "
          >
            Notification automatique — Agentova Tracker
          </p>

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
});

// =========================
// Gestion des erreurs JSON
// =========================

app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur :", err);

  res.status(500).json({
    success: false,
    error: "Erreur serveur",
  });
});

// =========================
// Démarrage du serveur
// =========================

app.listen(PORT, () => {
  console.log("");
  console.log("======================================");
  console.log("🚀 Agentova Tracker");
  console.log("======================================");
  console.log(`🌐 API : http://localhost:${PORT}`);
  console.log(`📩 Tracking : http://localhost:${PORT}/api/track-click`);
  console.log(`🔐 CORS : ${ALLOWED_ORIGIN}`);
  console.log("======================================");
  console.log("");
});