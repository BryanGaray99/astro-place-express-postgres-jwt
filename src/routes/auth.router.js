const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const AuthService = require('../services/auth.service');
const validatorHandler = require('../middlewares/validator.middleware');
const { updtateUserPassword } = require('../schemas/user.schema');

const router = express.Router();
const authService = new AuthService();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      res.json(authService.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const emailConf = await authService.recoveryMail(email);
      res.json(emailConf);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/reset-password',
  validatorHandler(updtateUserPassword, 'body'),
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const user = await authService.resetPassword(token, password);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

