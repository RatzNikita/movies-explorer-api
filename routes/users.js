const router = require('express').Router();
const {
  updateProfile, getUserInfo,
} = require('../controllers/users');
const { updateProfileValidation } = require('../validation/celebrateSchemas');

router.get('/me', getUserInfo);
router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
