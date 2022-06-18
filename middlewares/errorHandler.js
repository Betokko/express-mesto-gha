const errorHandler = (err, req, res, next) => {
  if (err.message === 'Email или password не могут быть пустыми!') {
    return res.status(400).send({ message: err.message });
  }
  if (
    err.message === 'Необходима авторизация'
    || err.message === 'Введен неверный email или password'
    || err.message === 'Пользователь с таким email не найден'
  ) {
    return res.status(401).send({ message: err.message });
  }
  if (err.message === 'Пользователь не найден'
  || err.message === 'Карточка не найдена') {
    return res.status(404).send({ message: err.message });
  }
  if (err.message === 'Такой пользователь уже существует') {
    return res.status(409).send({ message: err.message });
  }
  next();
  return res.status(500).send({ message: 'На сервере произошла ошибка' });
};

module.exports = { errorHandler };
