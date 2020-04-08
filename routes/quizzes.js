const express = require("express");
const {
  getQuiz,
  getQuizzes,
  updateQuiz,
  createQuiz,
  deleteQuiz
} = require("../controllers/quizzes");

const Quiz = require("../models/Quiz");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Include other resource routers
const wordRouter = require("./words");
const reviewRouter = require("./reviews");

// Re-route into other resource routers
router.use("/:quizId/words", wordRouter);
router.use("/:quizId/reviews", reviewRouter);

router
  .route("/")
  .get(
    protect,
    authorize("user", "publisher", "admin"),
    advancedResults(Quiz, {
      path: "words",
      select: "title POS"
    }),
    getQuizzes
  )
  .post(protect, authorize("publisher", "admin"), createQuiz);

router
  .route("/:id")
  .get(getQuiz)
  .put(protect, updateQuiz)
  .delete(protect, deleteQuiz);

module.exports = router;
