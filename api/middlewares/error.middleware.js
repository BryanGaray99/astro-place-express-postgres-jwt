
// Middleware para logear errores
function logErrors (err, req, res, next) {
  // console.log('logErrors');
  // console.error(err);
  // El next() pasa el error al siguiente middleware
  next(err);
}

// Boom para manejar errores
function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

// Middleware para manejar errores
function errorHandler (err, req, res, next) {
    // console.log('errorHandler');
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
};

module.exports = { logErrors , errorHandler, boomErrorHandler };
