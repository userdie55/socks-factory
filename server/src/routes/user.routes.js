const router = require('express').Router();
const { verifyAccessToken } = require('../middleware/verifyTokens');
const UserController = require('../controllers/UserController');

router.get('/:id/cart', verifyAccessToken, UserController.getUserCart);

module.exports = router;
