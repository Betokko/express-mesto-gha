const bcrypt = require('bcrypt');

const User = require('../models/user');
const { handleError } = require('../utils/handlers');

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
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password || !email) {
    return res.status(400).send({ message: 'Email или password не могут быть пустыми!' });
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(403).send({ message: 'Такой пользлватель уже существует' });
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          }))
          .then((response) => res.status(201).send(response))
          .catch((err) => handleError(err, res));
      }
    });
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
