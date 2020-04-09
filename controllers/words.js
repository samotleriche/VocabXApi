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
  console.log(req.params);
  if (req.params.quizId) {
    const words = await Word.find({ quiz: req.params.quizId });

    return res.status(200).json({
      success: true,
      count: words.length,
      data: words
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
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
// @route   POST /api/v1/words
// @route   POST /api/v1/quizzes/:quizId/words
// @access  Private
exports.createWord = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  if (req.params.quizId) {
    req.body.quiz = req.params.quizId;

    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return next(
        new ErrorResponse(`No Quiz with id of ${req.params.quizId} found`, 404)
      );
    }

    // Make sure user is quiz owner
    if (quiz.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to add a word to quiz: ${quiz._id}`,
          401
        )
      );
    }
  }
  const word = await Word.create(req.body);
  res.status(201).json({
    success: true,
    data: word
  });
});

// TODO FINISH THIS
// @desc    Associate word to quiz
// @route   PUT /api/v1/quizzes/:quizId/words/:wordId
// @access  Private
exports.associateWord = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.quiz = req.params.quizId;

  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) {
    return next(
      new ErrorResponse(`No Quiz with id of ${req.params.quizId} found`, 404)
    );
  }

  // Make sure user is quiz owner
  if (quiz.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a word to quiz: ${quiz._id}`,
        401
      )
    );
  }
  const word = await Word.findById(req.params.wordId);
  if (!word) {
    return next(
      new ErrorResponse(`No Word with id of ${req.params.wordId} found`, 404)
    );
  }

  word = Word.findByIdAndUpdate(req.params.wordId, { quiz: req.params.quizId });

  res.status(201).json({
    success: true,
    data: word
  });
});

// @desc    update word
// @route   Get /api/v1/words/:id
// @access  Public
exports.updateWord = asyncHandler(async (req, res, next) => {
  const word = await Word.findById(req.params.id);

  if (!word) {
    return next(
      new ErrorResponse(`User word found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is word owner
  if (word.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update word: ${word._id}`,
        401
      )
    );
  }

  word = await Word.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: word });
});

// @desc    delete word
// @route   Get /api/v1/words/:id
// @access  Public
exports.deleteWord = asyncHandler(async (req, res, next) => {
  const word = await Word.findById(req.params.id);

  if (!word) {
    return next(
      new ErrorResponse(`Word not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is word owner
  if (word.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete word: ${word._id}`,
        401
      )
    );
  }

  await word.remove();

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
