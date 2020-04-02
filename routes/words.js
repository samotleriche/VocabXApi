const express = require("express");
const {
  getWord,
  getWords,
  updateWord,
  createWord,
  deleteWord,
  wordPhotoUpload
} = require("../controllers/words");

const { protect, authorize } = require("../middleware/auth");

const Word = require("../models/Word");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

router.route("/:id/photo").put(wordPhotoUpload);

router
  .route("/")
  .get(
    advancedResults(Word, {
      path: "quiz",
      select: "name description"
    }),
    getWords
  )
  .post(protect, createWord);

router
  .route("/:id")
  .get(getWord)
  .put(protect, authorize("admin"), updateWord)
  .delete(protect, deleteWord);

module.exports = router;
