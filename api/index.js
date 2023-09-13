const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.middleware');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para recibir información
app.use(express.json());

// Middleware para habilitar CORS
const whitelist = ['http://127.0.0.1:8080','http://localhost:3000']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(newError('no permitido'));
    }
  }
};

app.use(cors(options));

// Traemos el router de las rutas
routerApi(app);

//Middleware para manejar errores (Se escriben en el orden en el que van a ser usados)
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/web.js', (req, res) => {
  res.sendFile(__dirname + './web.js');
});

app.listen(port, () => {
    console.log(`Astro place backend app listening at http://localhost:${port}`);
});
