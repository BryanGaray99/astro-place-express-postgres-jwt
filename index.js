const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/error.middleware');
const app = express();
const port = 3000;

// Middleware para recibir información
app.use(express.json());

// Traemos el router de las rutas
routerApi(app);

//Middleware para manejar errores (Se escriben en el orden en el que van a ser usados)
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Astro place backend app listening at http://localhost:${port}`);
});
