const errorHandler = (err, req, res, next) => {
  if (
    err.message === 'Необходима авторизация'
    || err.message === 'Введен неверный email или password'
    || err.message === 'Пользователь с таким email не найден'
  ) {
    return res.status(401).send({ message: err.message });
  }
  next();
  return res.status(500).send({ message: 'Ошибка сервера' });
};

module.exports = { errorHandler };
