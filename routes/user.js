const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const validateUrl = require('../utils/validators');

const {
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUser,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom((link) => validateUrl(link)),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
