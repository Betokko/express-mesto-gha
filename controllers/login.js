const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { PRIVATE_KEY } = process.env;
const incorrectData = new Error('Введен неверный email или password');
const notFound = new Error('Пользователь с таким email не найден');

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(incorrectData);
  }
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        next(notFound);
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
          next(incorrectData);
          return null;
        });
      }
    })
    .catch(next);
};

module.exports = { login };
