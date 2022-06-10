const User = require('../models/user');

const handleError = (err, res) => {
  if (err.name === 'CastError') {
    res.status(404).send({ message: err.message })
  }
  if (err.name === 'Error') {
    res.status(400).send({ message: err.message })
  }
  res.status(500).send({ message: err.message })
}

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(handleError);
};
const getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) throw new Error('Пользователь не найден')
      res.send(user)
    })
    .catch(handleError);
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(handleError);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id, 
    { name, about }, 
    { new: true },
    { runValidators: true }
  )
    .then(user => {
      if (!user) throw new Error('Пользователь не найден')
      res.send(user)
    })
    .catch(handleError);
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id, 
    { avatar },
    { new: true },
    { runValidators: true }
  )
    .then(user => {
      if (!user) throw new Error('Пользователь не найден')
      res.send(user)
    })
    .catch(handleError);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
