require('dotenv').config();
// console.log(require('crypto').randomBytes(16).toString('hex'));

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./error-classes/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
