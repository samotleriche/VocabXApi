const Word = require('../models/Word');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all words
// @route   Get /api/v1/words
// @route   Get /api/v1/quizzes/:quizId/words
// @access  Public 
exports.getWords = asyncHandler(async (req, res, next) => {

    let query;

    if(req.params.quizId) {
        query = Word.find({ quiz: req.params.quizId });
    } else {
        query = Word.find();
    }

    const words = await query;

    res
        .status(200)
        .json({ success: true, count: words.length, data: words })

});

// @desc    Get word by id
// @route   Get /api/v1/user/:id
// @access  Public 
exports.getUser = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`,
             404));
    }

    res
        .status(200)
        .json({ success: true, data: user })

});

// @desc    create word
// @route   Get /api/v1/users
// @access  Public 
exports.createUser = asyncHandler(async (req, res, next) => {

    const user = await User.create(req.body);
    res
        .status(201)
        .json({ 
            success: true,
            data: user })

});

// @desc    update word
// @route   Get /api/v1/users
// @access  Public 
exports.updateUser = asyncHandler(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`,
             404));
    }

    res
        .status(200)
        .json({ success: true, data: user })

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
