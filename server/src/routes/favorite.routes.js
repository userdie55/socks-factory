const router = require('express').Router();
const { verifyAccessToken } = require('../middleware/verifyTokens');
const FavoritesController = require('../controllers/FavoritesController');

router.get('/', verifyAccessToken, FavoritesController.getFavorites);
router.post('/', verifyAccessToken, FavoritesController.addFavorite);
router.delete('/:id', verifyAccessToken, FavoritesController.removeFavorite);

module.exports = router;
