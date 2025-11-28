const FavoritesService = require('../services/FavoritesService');

class FavoritesController {
  static async getFavorites(req, res) {
    try {
      const { id } = req.params;
      const items = await FavoritesService.getUserFavorites(id);

      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addFavorite(req, res) {
    try {
      const userId = req.user?.id || req.body.user_id;
      if (!userId) {
        return res.status(400).json({ error: 'User id required' });
      }
      console.log(req.body);

      const data = req.body;
      const favorite = await FavoritesService.addToFavorites(userId, data);

      res.json(favorite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async removeFavorite(req, res) {
    try {
      await FavoritesService.removeFavorite(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FavoritesController;
