import nodemailer from "nodemailer";

// --- Origines autorisées (plus de *.vercel.app ouvert à tous) ---
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://agentova-ai.vercel.app",
  ...(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
];

// --- Liste blanche des sources réellement utilisées par le frontend ---
const STATIC_SOURCES = new Set([
  "navbar", "cooptation", "section-activiter", "avis-titre", "question",
  "section-conclusion", "section-difference", "section-responsabilite",
  "home-hero", "home-onboarding-phone", "home-opportunity", "home-overview",
  "home-overview-tree", "home-overview-two", "home-recrutement",
  "home-revolution", "home-section-network", "home-solution", "home-works-two",
]);
const AGENT_SOURCE = /^agent-(charlotte|ethan|benoit|amandine|margot|arthur|elisa|samy)-(question|responsabilite|difference|avis-titre|conclusion)$/;

const isValidSource = (s) =>
  typeof s === "string" && s.length <= 50 && (STATIC_SOURCES.has(s) || AGENT_SOURCE.test(s));

// --- Limites (en mémoire : garde-fou, pas une garantie en serverless) ---
const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;
let lastEmailAt = 0;
const MIN_EMAIL_INTERVAL_MS = 30_000; // 1 email max / 30 s au total

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : null;

  if (allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).end();
  if (!allowedOrigin) return res.status(403).end();

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NOTIFY_EMAIL) {
    console.error("Variables d'environnement manquantes");
    return res.status(500).end();
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return res.status(429).end();

  // Source invalide : on ignore en silence, aucun email
  const source = req.body?.source;
  if (!isValidSource(source)) return res.status(204).end();

  // Anti-flood global
  const now = Date.now();
  if (now - lastEmailAt < MIN_EMAIL_INTERVAL_MS) return res.status(204).end();
  lastEmailAt = now;

  try {
    const currentDate = new Date().toLocaleString("fr-FR", {
      timeZone: "Indian/Antananarivo",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    await transporter.sendMail({
      from: `"Agentova Tracker" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `🔔 Nouveau clic CTA — ${source}`,
      text: `Nouveau clic CTA\nPage source : ${source}\nDate : ${currentDate}`, // texte brut, plus de HTML
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur tracking clic :", error.message);
    return res.status(500).end();
  }
}