const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UnauthorizedError = require('../error-classes/UnauthorizedError');

const { PRIVATE_KEY = 'dev-secret' } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Пользователь с таким email не найден'));
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ _id: user._id }, PRIVATE_KEY);
            return res
              .cookie('jwt', token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
              })
              .status(200)
              .send({ token });
          }
          next(new UnauthorizedError('Введен неверный email или password'));
          return null;
        });
      }
    })
    .catch(next);
};

module.exports = { login };
