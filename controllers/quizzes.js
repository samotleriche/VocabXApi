const Quiz = require('../models/Quiz');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');



// @desc    Get all quizzes
// @route   Get /api/v1/quizzes
// @access  Public 
exports.getQuizzes = asyncHandler(async (req, res, next) => {

    res.status(200).json(res.advancedResults);

});

// @desc    Get single quizzes
// @route   Get /api/v1/bootcamps/:id
// @access  Public 
exports.getQuiz = asyncHandler(async (req, res, next) => {

    const quiz = await Quiz.findById(req.params.id).populate('words');

    if(!quiz) {
        return next(new ErrorResponse(`Quiz not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: quiz })
});

// @desc    Create a new quiz
// @route   POST /api/v1/bootcamps/:id
// @access  Private 
exports.createQuiz = asyncHandler(async (req, res, next) => {

    const quiz = await Quiz.create(req.body);
    res.status(201).json({
        success: true,
        data: quiz
    });
});

// @desc    Update a quiz
// @route   PUT /api/v1/bootcamps/:id
// @access  Private 
exports.updateQuiz = asyncHandler(async (req, res, next) => {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!quiz) {
        return next(new ErrorResponse(`Quiz not found with id of ${req.params.id}`, 404));
    }

    res.status(202).json({
        success: true,
        data: quiz
    });
});

// @desc    Delete a quiz
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private 
exports.deleteQuiz = asyncHandler(async (req, res, next) => {

    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if(!quiz) {
        return next(new ErrorResponse(`Quiz not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
        success: true,
        data: quiz
    });


});