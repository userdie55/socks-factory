const router = require('express').Router();
const { verifyAccessToken } = require('../middleware/verifyTokens');
const UserController = require('../controllers/UserController');

router.get('/:id/cart', UserController.getUserCart);
// .post('/signup', UserController.signUpUser)
// .post('/signin', UserController.signInUser)
// .delete('/signout', verifyAccessToken, UserController.signOutUser)

module.exports = router;
