const router = require('express').Router()
const CartController = require('../controllers/CartController');

router.post('/add', CartController.addToCart);
router.patch('/items/:id', CartController.updateQuantity);
router.delete('/items/:id', CartController.deleteItem);

module.exports = router