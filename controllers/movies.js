const Movie = require('../models/movie');
const { handleException } = require('../exceptions/exceptions');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => movies.filter((movie) => movie.owner.equals(req.user._id)))
    .then((movies) => {
      if (movies.length < 1) {
        handleException({ name: 'NotFound' }, req, res);
      } else {
        res.send(movies);
      }
    })
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({
    ...req.body,
    owner,
  })
    .then((movie) => {
      movie.populate('owner')
        .then((populatedMovie) => res.status(201)
          .send(populatedMovie));
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById({ _id: req.params._id })
    .then((movie) => {
      if (!movie) {
        handleException({ name: 'NotFound' }, req, res);
      } else if (movie.owner.equals(req.user._id)) {
        movie.deleteOne()
          .then(() => res.send({ message: 'Фильм удалён' }));
      } else {
        handleException({ name: 'NotPermissions' }, req, res);
      }
    })
    .catch(next);
};
