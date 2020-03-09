const Quiz = require('../models/Quiz');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');



// @desc    Get all quizzes
// @route   Get /api/v1/bootcamps
// @access  Public 
exports.getQuizzes = asyncHandler(async (req, res, next) => {

    let query;

    const reqQuery = { ...req.query }; 

    // Fields to exclude
    const removeFields = ['select','sort','page','limit'];
    // Loop over and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Quiz.find(JSON.parse(queryStr)).populate('words');
    
    // Select fields
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
        console.log(fields);
    }

    // Sort
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page -1) * limit;
    const endIndex = page * limit;
    const total = await Quiz.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Executing query
    const quizzes = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1, 
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page -1,
            limit
        }
    }

    res
        .status(200)
        .json({ success: true, count: quizzes.length, pagination, data: quizzes })

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