const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/user');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  req.user = {
    _id: '62a21ee014695722171ef55a',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);
app.post('/signin', login);
app.post('/signup', createUser);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Page Not Found' });
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
