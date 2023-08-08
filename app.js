require('dotenv')
  .config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleException } = require('./exceptions/exceptions');
const { limiter } = require('./middlewares/limiter');
const router = require('./routes');

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  ALLOWED_CORS = 'http://localhost:3001',
} = process.env;

mongoose.connect(DB_URL);

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(requestLogger);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (ALLOWED_CORS.split(', ')
    .includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

router(app);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  handleException(err, req, res, next);
});

app.listen(PORT);
