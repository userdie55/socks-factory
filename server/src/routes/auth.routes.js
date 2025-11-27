const router = require('express').Router();
const { verifyAccessToken } = require('../middleware/verifyTokens');
const UserController = require('../controllers/UserController');

router
  .get('/refreshToken', UserController.refreshToken)
  .post('/signup', UserController.signUpUser)
  .post('/signin', UserController.signInUser)
  .delete('/signout', UserController.signOutUser);

module.exports = router;
