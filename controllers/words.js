const path = require("path");
const Word = require("../models/Word");
const Quiz = require("../models/Quiz");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get all words
// @route   Get /api/v1/words
// @route   Get /api/v1/quizzes/:quizId/words
// @access  Public
exports.getWords = asyncHandler(async (req, res, next) => {
  let query;
  console.log(req.params);
  if (req.params.quizId) {
    query = Word.find({ quiz: req.params.quizId });
  } else {
    query = Word.find().populate({
      path: "quiz",
      select: "name description"
    });
  }

  const words = await query;

  res.status(200).json({ success: true, count: words.length, data: words });
});

// @desc    Get word by id
// @route   Get /api/v1/word/:id
// @access  Public
exports.getWord = asyncHandler(async (req, res, next) => {
  const word = await Word.findById(req.params.id).populate({
    path: "quiz",
    select: "name description"
  });

  if (!word) {
    return next(new ErrorResponse(`No word with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: word
  });
});

// @desc    create word
// @route   POST /api/v1/users
// @route   POST /api/v1/quizzes/:quizId/words
// @access  Private
exports.createWord = asyncHandler(async (req, res, next) => {
  req.body.quiz = req.params.quizId;

  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) {
    return next(
      new ErrorResponse(`No Quiz with id of ${req.params.quizId} found`, 404)
    );
  }

  const word = await Word.create(req.body);
  res.status(201).json({
    success: true,
    data: word
  });
});

// @desc    update word
// @route   Get /api/v1/words/:id
// @access  Public
exports.updateWord = asyncHandler(async (req, res, next) => {
  const word = await Word.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!word) {
    return next(
      new ErrorResponse(`User word found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: word });
});

// @desc    delete word
// @route   Get /api/v1/words/:id
// @access  Public
exports.deleteWord = asyncHandler(async (req, res, next) => {
  const word = await Word.findByIdAndDelete(req.params.id);

  if (!word) {
    return next(
      new ErrorResponse(`Word not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: word
  });
});

// @desc    Upload photo for word
// @route   PUT /api/v1/words/:id/photo
// @access  Private
exports.wordPhotoUpload = asyncHandler(async (req, res, next) => {
  const word = await Word.findById(req.params.id);

  if (!word) {
    return next(
      new ErrorResponse(`Word not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filsize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${word._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Word.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
