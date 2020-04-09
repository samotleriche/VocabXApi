const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc    Get all users
// @route   Get /api/v1/users
// @access  Private 
exports.getUsers = asyncHandler(async (req, res, next) => {

    //const users = await User.find();
    res
        .status(200)
        .json(res.advancedResults);

});

// @desc    Get user by id
// @route   Get /api/v1/users/:id
// @access  Private 
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
// @route   POST /api/v1/users
// @access  Private 
exports.createUser = asyncHandler(async (req, res, next) => {

    const user = await User.create(req.body);
    user.password = undefined;
    res
        .status(201)
        .json({ 
            success: true,
            data: user })

});

// @desc    Update a user
// @route   PUT /api/v1/users/:id
// @access  Private 
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

    res.status(200).json({ 
        success: true, 
        data: user 
    })

});

// @desc    Delete a users
// @route   DELETE /api/v1/users/:id
// @access  Private 
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
            deleted: true,
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