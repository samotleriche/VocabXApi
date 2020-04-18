const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
var natural = require('natural');


// @desc    Get all quizzes
// @route   Get /api/v1/quizzes
// @access  Public
exports.getText = asyncHandler(async (req, res, next) => {
    var tokenizer = new natural.WordTokenizer();

    const { text } = req.body;

    const result = tokenizer.tokenize(text);

    res.status(200).json({
      success: true,
      data: result
    });
  });