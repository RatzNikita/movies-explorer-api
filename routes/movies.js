/* eslint-disable import/no-extraneous-dependencies */
const router = require('express')
  .Router();
const {
  postMovie,
  getMovies,
  removeMovie,
} = require('../controllers/movies');
const {postMovieValidation,movieIdValidation} = require('../validation/celebrateSchemas');

router.get('', getMovies);
router.post('', postMovieValidation, postMovie);
router.delete('/:_id', movieIdValidation, removeMovie);

module.exports = router;
