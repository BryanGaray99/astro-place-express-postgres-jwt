const express = require('express');

const categoriesRouter = express.Router();

categoriesRouter.get('/:categoryId/products/:id', (req, res) => {
  const { id, categoryId } = req.params;
  res.json({
    categoryId,
    id
  })
});

module.exports = categoriesRouter;
