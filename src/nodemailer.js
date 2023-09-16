"use strict";
const nodemailer = require("nodemailer");
const { config } = require("./config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.smtpEmail,
    pass: config.smtpPassword
}
});

async function sendMail() {
  const info = await transporter.sendMail({
    from: config.smtpEmail,
    to: config.smtpEmail,
    subject: "Prueba de Astro Place",
    text: "Este es un correo de prueba enviado desde el Backend de Astro Place",
  });

  console.log("Message sent: %s", info.messageId);
}

sendMail();
