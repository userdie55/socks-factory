const router = require("express").Router();
const DesignsController = require("../controllers/DesignsController");
const { verifyAccessToken } = require("../middleware/verifyTokens");

router.post("/", verifyAccessToken, DesignsController.createDesign);

module.exports = router;
