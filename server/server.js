// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'selonrandriavao@gmail.com', pass: 'kkhalfqiovblzvor' }
  });

  await transporter.sendMail({
    from: email,
    to: 'selonrandriavao@gmail.com',
    subject: `Nouveau message de ${name}`,
    text: message
  });

  res.status(200).send('Email envoyé');
});

app.listen(5000, () => console.log('Serveur actif sur le port 5000'));