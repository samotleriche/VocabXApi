const mongoose = require('mongoose');


const WordSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    },
    definition: {
        type: String,
        required: [true, 'Please add a definition']
    },
    POS: {
        type: String,
        required: [true, 'Please add a part of speach'],
        enum: ['noun', 'verb', 'adjective', 'adverb']
    },
    origin: {
        type: String,
        
    },
    pronouce: {
        type: String,
    },
    progress: {
        type: String,
        required: [true, 'Please add a progress amount'],
        enum: ['none', 'learning', 'learned']
    },
    quiz: {
        type: mongoose.Schema.ObjectId,
        ref: 'quiz',
        required: true
    }

});

module.exports = mongoose.model('word', WordSchema)