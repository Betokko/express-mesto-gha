const Card = require('../models/card');

const handleError = (err, res) => {
  if (err.name === 'CastError') {
    res.status(404).send({ message: err.message })
  }
  if (err.name === 'Error') {
    res.status(400).send({ message: err.message })
  }
  res.status(500).send({ message: err.message })
}

const getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(handleError);
};

const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch(handleError);
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if (!card) throw new Error('Карточка не найдена');
      res.send(card)
    })
    .catch(handleError);
};

const addLikeOnCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(card => {
      if (!card) throw new Error('Карточка не найдена');
      res.send(card)
    })
    .catch(handleError);
};

const removeLikeOnCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then(card => {
      if (!card) throw new Error('Карточка не найдена');
      res.send(card)
    })
    .catch(handleError);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeOnCard,
  removeLikeOnCard,
};
