const mongoose = require('mongoose');
const { urlRegex } = require('../validation/validationConstants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 5000,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} некорректная ссылка!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} некорректная ссылка!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
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
    minlength: 1,
    maxlength: 1000,
    required: true,
  },
  nameRU: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
