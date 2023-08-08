const {
  loginValidation,
  createUserValidation,
} = require('../validation/celebrateSchemas');
const {
  login,
  createUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { handleException } = require('../exceptions/exceptions');
const users = require('./users');
const movies = require('./movies');

module.exports = (app) => {
  app.use('/signin', loginValidation, login);
  app.use('/signup', createUserValidation, createUser);
  app.use(auth);
  app.use('/users', users);
  app.use('/movies', movies);
  app.use('/', (req, res) => {
    handleException({ name: 'PageNotFound' }, req, res);
  });
};
