const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all users
// @route   Get /api/v1/users
// @access  Public 
exports.getUsers = asyncHandler(async (req, res, next) => {

    const users = await User.find();

    res
        .status(200)
        .json({ success: true, count: users.length, data: quizzes })

});

// @desc    Get all users
// @route   Get /api/v1/users
// @access  Public 
exports.getUser = asyncHandler(async (req, res, next) => {

    const users = await User.

    res
        .status(200)
        .json({ success: true, count: users.length, data: quizzes })

});

// @desc    Get all users
// @route   Get /api/v1/users
// @access  Public 
exports.getUsers = asyncHandler(async (req, res, next) => {

    const users = await User.find();

    res
        .status(200)
        .json({ success: true, count: users.length, data: quizzes })

});

// @desc    Get all users
// @route   Get /api/v1/users
// @access  Public 
exports.getUsers = asyncHandler(async (req, res, next) => {

    const users = await User.find();

    res
        .status(200)
        .json({ success: true, count: users.length, data: quizzes })

});

// @desc    Get all users
// @route   Get /api/v1/users
// @access  Public 
exports.getUsers = asyncHandler(async (req, res, next) => {

    const users = await User.find();

    res
        .status(200)
        .json({ success: true, count: users.length, data: quizzes })

});