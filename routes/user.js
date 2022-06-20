const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/me', getUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern((/https?:\/\/[\w\W]+(gif|jpe?g|bmp|png|webp)$/)),
  }),
}), updateUserAvatar);

module.exports = router;
