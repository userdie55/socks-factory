// src/controllers/FavoritesController.js

const { Favorite, SocksDesign } = require('../db/models');

class FavoritesController {
  // GET /api/favorites
  static async getFavorites(req, res) {
    try {
      const user_id = req.user.id;

      const favorites = await Favorite.findAll({
        where: { user_id },
        include: [
          {
            model: SocksDesign,
          },
        ],
      });

      return res.status(200).json(favorites);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // POST /api/favorites
  // на фронте просто отправляешь весь дизайн как объект в body
  static async addFavorite(req, res) {
    try {
      const user_id = req.user.id;
      const design_json = req.body; // весь дизайн носка

      if (!design_json) {
        return res.status(400).json({ error: 'No design data provided' });
      }

      // создаём дизайн носка
      const design = await SocksDesign.create({
        user_id,
        design_json,
      });

      // создаём запись в избранном
      const favorite = await Favorite.create({
        user_id,
        design_id: design.id,
      });

      return res.status(201).json({ favorite, design });
    } catch (error) {
      console.log('ADD FAVORITE ERROR:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE /api/favorites/:id
  static async deleteFavorite(req, res) {
    try {
      const user_id = req.user.id;
      const { id } = req.params;

      const deleted = await Favorite.destroy({
        where: { id, user_id },
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Favorite not found' });
      }

      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FavoritesController;
