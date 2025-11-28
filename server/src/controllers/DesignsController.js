class DesignsController {
  static async createDesign(req, res) {
    try {
      const user_id = req.user.id;

      const design = await SocksDesign.create({
        user_id,
        design_json: req.body,
      });

      return res.status(201).json(design);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

module.exports = DesignsController;
