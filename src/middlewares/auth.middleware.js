const boom = require('@hapi/boom');
const { config } = require('../config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  };
  next();
};

module.exports = { checkApiKey }
