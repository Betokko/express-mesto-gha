const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(404).send({ message: err.message }));
};
const getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err => res.status(404).send({ message: err.message }));
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(err => res.status(400).send({ message: err.message }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => res.send(user))
    .catch(err => res.status(400).send({ message: err.message }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => res.send(user))
    .catch(err => res.status(400).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
