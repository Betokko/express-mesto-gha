const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  addLikeOnCard,
  removeLikeOnCard,
} = require('../controllers/card');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/https?:\/\/[\w\W+]+(gif|jpe?g|bmp|png|webp)$/),
    }),
  }),
  createCard,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  addLikeOnCard,
);

router.delete('/:cardId/likes', removeLikeOnCard);

module.exports = router;
