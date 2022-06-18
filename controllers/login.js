const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const PRIVATE_KEY = 'some-secret-key';
const LoggingErrorHandler = (res) => res.status(401).send({ message: 'Введен неверный email или password' });

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return LoggingErrorHandler(res);
  }
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: 'Пользлватель с таким email не найден' });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              { _id: user._id },
              PRIVATE_KEY,
            );
            return res
              .cookie('jwt', token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
              })
              .status(200)
              .send({ token });
          }
          return LoggingErrorHandler(res);
        });
      }
    });
};

module.exports = { login };
