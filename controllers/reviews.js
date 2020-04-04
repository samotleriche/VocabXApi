const Review = require("../models/Review");
const Quiz = require("../models/Quiz");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get all reviews
// @route   Get /api/v1/reviews
// @route   Get /api/v1/quizzes/:quizId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.quizId) {
    const reviews = await Review.find({ quiz: req.params.quizId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get a review
// @route   Get /api/v1/reviews/:id
// @access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "quiz",
    select: "name description"
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }
});
