const router = require("express").Router();
const FavoritesController = require("../controllers/FavoritesController");

router.get("/", FavoritesController.getFavorites);
router.post("/", FavoritesController.addFavorite);
router.delete("/:id", FavoritesController.removeFavorite);

module.exports = router;
