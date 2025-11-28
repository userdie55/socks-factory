const router = require('express').Router();
const { verifyAccessToken } = require('../middleware/verifyTokens');
const CartController = require('../controllers/CartController');

router.post('/add', verifyAccessToken, CartController.addToCart);
router.patch('/items/:id', verifyAccessToken, CartController.updateQuantity);
router.delete('/items/:id', verifyAccessToken, CartController.deleteItem);

module.exports = router;
