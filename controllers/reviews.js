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
  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc    Add a review
// @route   POST /api/v1/quizzes/:quizId/reviews
// @access  Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.quiz = req.params.quizId;
  req.body.user = req.user.id;

  const quiz = await Quiz.findById(req.params.quizId);

  if (!quiz) {
    return next(
      new ErrorResponse(`No Quiz with the id of ${req.params.quizId}`, 404)
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});

// @desc    Update a review
// @route   PUT /api/v1/reviews/:id
// @access  Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No Review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    success: true,
    data: review
  });
});
