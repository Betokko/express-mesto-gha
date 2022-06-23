const mongoose = require('mongoose');
const npmValidator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validator: (v) => npmValidator.isURL(v),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: (v) => npmValidator.isEmail(v),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
