import nodemailer from 'nodemailer';

const ALLOWED_ORIGIN = process.env.CLIENT_URL || '*';

export default async function handler(req, res) {
  // Gestion CORS (nécessaire car client et serveur seront sur des domaines différents)
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Requête préliminaire du navigateur (préflight CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Méthode non autorisée');
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).send('Champs manquants');
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Variables EMAIL_USER / EMAIL_PASS manquantes');
    return res.status(500).send('Configuration serveur invalide');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Nouveau message de ${name}`,
      text: message,
    });

    res.status(200).send('Email envoyé');
  } catch (error) {
    console.error('Erreur envoi email :', error);
    res.status(500).send("Erreur lors de l'envoi de l'email");
  }
}