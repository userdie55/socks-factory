const router = require('express').Router();
const CartController = require('../controllers/CartController');
const { verifyAccessToken } = require('../middleware/verifyTokens');

router.get('/', verifyAccessToken, CartController.getCart);
router.post('/', verifyAccessToken, CartController.addToCart);

// ❌ Убираем updateQuantity — его больше нет
// router.patch('/items/:id', verifyAccessToken, CartController.updateQuantity);

router.delete('/items/:id', verifyAccessToken, CartController.deleteItem);

module.exports = router;
