const User = require('../models/user');

const handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: err.message });
    return;
  }
  if (err.name === 'CastError') {
    res.status(400).send({ message: err.message });
    return;
  }
  if (err.name === 'Error') {
    res.status(404).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: err.message });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(err, res));
};
const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) throw new Error('Пользователь не найден');
      res.send(user);
    })
    .catch((err) => handleError(err, res));
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => handleError(err, res));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
    { runValidators: true },
  )
    .then((user) => {
      if (!user) throw new Error('Пользователь не найден');
      res.send(user);
    })
    .catch((err) => handleError(err, res));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
    { runValidators: true },
  )
    .then((user) => {
      if (!user) throw new Error('Пользователь не найден');
      res.send(user);
    })
    .catch((err) => handleError(err, res));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
