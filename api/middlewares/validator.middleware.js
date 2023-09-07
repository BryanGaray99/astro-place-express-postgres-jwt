const boom = require('@hapi/boom');

// Middleware para validar
// Usamos closures para retornar una función que recibe el schema y la propiedad
function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property]; // Se envía property porque puede ser req.body o req.query o req.params
    const { error } = schema.validate(data, { abortEarly: false }); /// Usamos abort early para que envie todos los errores
    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  }
};

module.exports = validatorHandler;
