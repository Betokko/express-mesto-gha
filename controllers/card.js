const Card = require('../models/card');
const NotFoundError = require('../error-classes/NotFoundError');
const ForbiddenError = require('../error-classes/ForbiddenError');
const BadRequestError = require('../error-classes/BadRequestError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }
      return card
        .remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

const addLikeOnCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch(next);
};

const removeLikeOnCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeOnCard,
  removeLikeOnCard,
};
