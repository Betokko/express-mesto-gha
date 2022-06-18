require('dotenv').config();
// console.log(require('crypto').randomBytes(16).toString('hex'));

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
});
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
