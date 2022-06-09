const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(404).send({ message: err.message }));
};

const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch(err => res.status(400).send({ message: err.message }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};

const addLikeOnCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};

const removeLikeOnCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeOnCard,
  removeLikeOnCard,
};
