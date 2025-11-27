const router = require('express').Router()
const CartController = require('../controllers/CartController');

router.patch('/items/:id', CartController.updateQuantity);
router.delete('/items/:id', CartController.deleteItem);

module.exports = router