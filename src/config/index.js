require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  pgURL: process.env.POSTGRES_URL,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  jwtSecretLink: process.env.JWT_SECRET_LINK
};

module.exports = {config};
