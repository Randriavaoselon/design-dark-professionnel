import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const requiredEnvVars = ["EMAIL_USER", "EMAIL_PASS"];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    console.error(`Erreur : la variable d'environnement ${key} est manquante`);
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("API Contact Avenir-Tech fonctionne !");
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("Champs manquants");
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Nouveau message de ${name}`,
      text: message,
    });

    res.status(200).send("Email envoyé");
  } catch (error) {
    console.error("Erreur envoi email :", error);

    res.status(500).send("Erreur lors de l'envoi de l'email");
  }
});

export default app;
