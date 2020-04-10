const express = require("express");
const {
  getWord,
  getWords,
  updateWord,
  createWord,
  deleteWord,
  wordPhotoUpload,
  associateWord
} = require("../controllers/words");

const Word = require("../models/Word");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), wordPhotoUpload);

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
  .put(protect, authorize("publisher", "admin"), updateWord)
  .delete(protect, deleteWord);

module.exports = router;
