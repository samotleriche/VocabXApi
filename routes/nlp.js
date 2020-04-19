const express = require("express");
const { getText, getSentiment, getClassify } = require("../controllers/nlp");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router.use(protect);
router.use(authorize("admin"));

router.route("/").get(getText);

router.route("/getSentiment").get(getSentiment);
router.route("/classify").get(getClassify);

module.exports = router;
