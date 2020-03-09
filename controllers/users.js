const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc    Get all users
// @route   Get /api/v1/users
// @access  Public 
exports.getUsers = asyncHandler(async (req, res, next) => {

    const users = await User.find();

    res
        .status(200)
        .json({ success: true, count: users.length, data: users })

});

// @desc    Get user by id
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

// @desc    Create a user
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

// @desc    Update a user
// @route   Get /api/v1/users/:id
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

// @desc    Get all users
// @route   Get /api/v1/users/:id
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

// @desc    Get users within a radius
// @route   Get /api/v1/users/radius/:zipcode/:distance
// @access  Private
exports.getUserInRadius = asyncHandler(async (req, res, next) => {

    const { zipcode, distance } = req.params;

    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const users = await User.find({
        location : { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
    });

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });

});