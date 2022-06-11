const Card = require('../models/card');

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

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleError(err, res));
};

const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => handleError(err, res));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) throw new Error('Карточка не найдена');
      res.send(card);
    })
    .catch((err) => handleError(err, res));
};

const addLikeOnCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new Error('Карточка не найдена');
      res.send(card);
    })
    .catch((err) => handleError(err, res));
};

const removeLikeOnCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new Error('Карточка не найдена');
      res.send(card);
    })
    .catch((err) => handleError(err, res));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeOnCard,
  removeLikeOnCard,
};
