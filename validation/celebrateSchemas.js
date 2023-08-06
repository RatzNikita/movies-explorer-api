// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('./validationConstants');

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string()
      .length(24)
      .hex()
      .required(),
  }),
});

const postMovieValidation = celebrate({
  body: {
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required().min(2).max(30),
    owner: Joi.string().length(24).hex().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(300),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    movieId: Joi.number().required().min(1).max(30),
  },
});

const updateProfileValidation = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  },
});

const createUserValidation = celebrate({
  body: {
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2).max(30),
  },
});

const loginValidation = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  },
});

module.exports = {
  movieIdValidation,
  postMovieValidation,
  updateProfileValidation,
  createUserValidation,
  loginValidation,
};
