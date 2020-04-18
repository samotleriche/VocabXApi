const express = require("express");
const {
    getText
} = require("../controllers/nlp");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(getText);

module.exports = router;