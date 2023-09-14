require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  pgURL: process.env.POSTGRES_URL
};

module.exports = {config};
