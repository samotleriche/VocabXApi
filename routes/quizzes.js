const express = require("express");
const {
  getQuiz,
  getQuizzes,
  updateQuiz,
  createQuiz,
  deleteQuiz
} = require("../controllers/quizzes");

const Quiz = require("../models/Quiz");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

const { protect } = require("../middleware/auth");

// Include other resource routers

const wordRouter = require("./words");

// Re-route into other resource routers
router.use("/:quizId/words", wordRouter);

router
  .route("/")
  .get(
    protect,
    advancedResults(Quiz, {
      path: "words",
      select: "title POS"
    }),
    getQuizzes
  )
  .post(createQuiz);

router
  .route("/:id")
  .get(getQuiz)
  .put(updateQuiz)
  .delete(deleteQuiz);

module.exports = router;
