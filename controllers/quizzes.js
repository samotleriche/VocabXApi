
// @desc    Get all quizzes
// @route   Get /api/v1/bootcamps
// @access  Public 
exports.getQuizzes = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all Quizzes', hello: req.hello});
}

// @desc    Get single quizzes
// @route   Get /api/v1/bootcamps/:id
// @access  Public 
exports.getQuiz = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Showing Quiz ${req.params.id}`});
}

// @desc    Create a new quiz
// @route   POST /api/v1/bootcamps/:id
// @access  Private 
exports.createQuiz = (req, res, next) => {
    res.status(201).json({ success: true, msg: 'Created a Quiz'});
}

// @desc    Update a quiz
// @route   PUT /api/v1/bootcamps/:id
// @access  Private 
exports.updateQuiz = (req, res, next) => {
    res.status(202).json({ success: true, msg: `Quiz ${req.params.id} updated`});
}

// @desc    Delete a quiz
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private 
exports.deleteQuiz = (req, res, next) => {
    res.status(202).json({ success: true, msg: `Quiz ${req.params.id} deleted`});
}