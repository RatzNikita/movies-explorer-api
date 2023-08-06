const mongoose = require('mongoose');
const { urlRegex } = require('../validation/validationConstants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  year: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 300,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v); //eslint-disable-line
      },
      message: (props) => `${props.value} некорректная ссылка!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v); //eslint-disable-line
      },
      message: (props) => `${props.value} некорректная ссылка!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v); //eslint-disable-line
      },
      message: (props) => `${props.value} некорректная ссылка!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  nameRU: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
