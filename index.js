const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to Astro Place');
});

app.get('/about', (req, res) => {
    res.send('This is a backend practice with Node.js and Express.js');
});

app.get('/products', (req, res) => {
    res.json([
      {
        id: 1,
        name: 'Product 1',
        price: 100
      },
      {
        id: 2,
        name: 'Product 2',
        price: 200
      }
    ]);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({
      id,
      name: 'Product3',
      price: 300
    })
});

app.get('/categories/:categoryId/products/:id', (req, res) => {
    const { id, categoryId } = req.params;
    res.json({
      categoryId,
      id
    })
});

app.listen(port, () => {
    console.log(`Astro place backend app listening at http://localhost:${port}`);
});
