const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62a21ee014695722171ef55a',
  };

  next();
});
app.use('/', userRouter);
app.use('/', cardRouter);

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));