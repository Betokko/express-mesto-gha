const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../error-classes/UnauthorizedError');

const { PRIVATE_KEY = 'dev-secret' } = process.env;
const err = new UnauthorizedError('Необходима авторизация');

const auth = (req, res, next) => {
  const { cookies } = req;

  if (!cookies.jwt) {
    next(err);
  }

  const token = cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, PRIVATE_KEY);
  } catch (e) {
    next(err);
  }

  req.user = payload;
  return next();
};

module.exports = { auth };
