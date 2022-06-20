const bcrypt = require('bcrypt');

const User = require('../models/user');
const BadRequestError = require('../error-classes/BadRequestError');
const NotFoundError = require('../error-classes/NotFoundError');
const ConflictError = require('../error-classes/ConflictError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password || !email) {
    next(new BadRequestError('Email или password не могут быть пустыми!'));
  }
  const regex = /https?:\/\/[\w\W]+/g;
  if (regex.test(avatar)) {
    next(new BadRequestError('Некоректная ссылка'));
  }
  return User.findOne({ email }).then((user) => {
    if (user) {
      next(new ConflictError('Такой пользователь уже существует'));
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        }))
        .then((response) => res.status(201).send(response))
        .catch(next);
    }
  });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
    { runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
    { runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  updateUser,
  updateUserAvatar,
};
