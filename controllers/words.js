const Word = require('../models/Word');
const Quiz = require('../models/Quiz');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all words
// @route   Get /api/v1/words
// @route   Get /api/v1/quizzes/:quizId/words
// @access  Public 
exports.getWords = asyncHandler(async (req, res, next) => {

    let query;
    console.log(req.params);
    if(req.params.quizId) {
        query = Word.find({ quiz: req.params.quizId});
    } else {
        query = Word.find().populate({
            path: 'quiz',
            select: 'name description'
        });
    }

    const words = await query;

    res
        .status(200)
        .json({ success: true, count: words.length, data: words })

});

// @desc    Get word by id
// @route   Get /api/v1/user/:id
// @access  Public 
exports.getWord = asyncHandler(async (req, res, next) => {

    const word = await Word.findById(req.params.id).populate({
        path: 'quiz',
        select: 'name description'
    });

    if(!word) {
        return next(
            new ErrorResponse(`No word with id of ${req.params.id}`,
             404));
    }

    res
        .status(200)
        .json({ success: true, data: word })

});

// @desc    create word
// @route   POST /api/v1/users
// @route   POST /api/v1/quizzes/:quizId/words
// @access  Private
exports.createWord = asyncHandler(async (req, res, next) => {

    req.body.quiz = req.params.quizId;

    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz){
        return next(
            new ErrorResponse(`No Quiz with id of ${req.params.quizId} found`,
             404));
    }

    const word = await Word.create(req.body);
    res
        .status(201)
        .json({ 
            success: true,
            data: word })

});

// @desc    update word
// @route   Get /api/v1/users
// @access  Public 
exports.updateWord = asyncHandler(async (req, res, next) => {

    const word = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!word) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`,
             404));
    }

    res
        .status(200)
        .json({ success: true, data: word })

});

// @desc    delete word
// @route   Get /api/v1/users
// @access  Public 
exports.deleteUser = asyncHandler(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`,
             404));
    }

    res
        .status(200)
        .json({ 
            success: true,
            data: user
        });

});
