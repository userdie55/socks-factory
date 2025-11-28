const router = require('express').Router();
const FavoritesController = require('../controllers/FavoritesController');
const { verifyAccessToken } = require('../middleware/verifyTokens');

// ВСЁ ЭТО — ФУНКЦИИ, НЕ ОБЪЕКТЫ

router.get('/', verifyAccessToken, FavoritesController.getFavorites);
router.post('/', verifyAccessToken, FavoritesController.addFavorite);
router.delete('/:id', verifyAccessToken, FavoritesController.deleteFavorite);

module.exports = router;
