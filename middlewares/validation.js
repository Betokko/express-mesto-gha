const { celebrate, Joi } = require('celebrate');

const updateUserValidation = () => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  });
};
const updateUserAvatarValidation = () => {
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  });
};

module.exports = {
  updateUserValidation,
  updateUserAvatarValidation,
};
