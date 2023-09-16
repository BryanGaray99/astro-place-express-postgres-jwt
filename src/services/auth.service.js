const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { models } = require('../libs/sequelize');
const { config } = require('../config');
const UserService = require('../services/user.service');

const userService = new UserService();

class AuthService {
  constructor() {};

  async findByEmail(email) {
    const res = await models.User.findOne({
      where: { email },
    });
    return res;
  };

  async getUser(email, password) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Invalid password');
    };
    delete user.dataValues.password;
    return user;
  };

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    delete user.dataValues.recoveryToken;
    return {
      message: 'Login successful',
      user,
      token
    };
  };

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  };

  async recoveryMail(email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    };
    const payload = {
      sub: user.id
    };
    const token = jwt.sign(payload, config.jwtSecretLink, { expiresIn: '15min' });

    const link = `https://astro-place-b.netlify.app/my-account/recovery?token=${token}`;
    await userService.update(user.id, { recoveryToken: token });

    const mailToSend = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Recuperación de contraseña Astro Place",
      html: `<b>Hola estimad@ ${user.name}, has solicitado la recuperación de tu contraseña.</b>
            <br>Ingresa a este link: ${link}</br>
            <br>El link expira en 15 minutos.</br>`,
    };
    const res = await this.sendMail(mailToSend);
    return res;
  };

  async resetPassword(token, password) {
    try {
      const payload = jwt.verify(token, config.jwtSecretLink);
      const user = await userService.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      };
      const hash = await bcrypt.hash(password, 10);
      await userService.update(user.id, { password: hash, recoveryToken: null });
      return { message: 'Password updated' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
};


module.exports = AuthService;
