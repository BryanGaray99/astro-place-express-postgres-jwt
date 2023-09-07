const express = require('express');

const usersRouter = express.Router();

// Solicitudes GET y query parameters
usersRouter.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No parameters');
  }
});

// Create user
usersRouter.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'Se creó el usuario',
    data: body
  })
});

// Update user
usersRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Se actualizó el usuario',
    data: body,
    id
  })
});

// Delete user
usersRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Se eliminó el usuario',
    id
  })
});

module.exports = usersRouter;
