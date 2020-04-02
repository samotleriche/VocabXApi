const mongoose = require('mongoose');
const slugify = require('slugify');

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [250, 'Name cannot be more than 250 characters']
    },
    wordCount: {
        type: Number
    },
    completed: Boolean,
    progress: {
        type: [String],
        enum: [
            'none',
            'started',
            'finished'
        ],
        default: 'none'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
        select: true
      }
}, {
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});

// Create Quiz slug from the name
QuizSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true })
    next();
});

// Reverse populate with virtuals
QuizSchema.virtual('words', {
    ref: 'word',
    localField: '_id',
    foreignField: 'quiz',
    justOne: false
});

/*
QuizSchema.virtual('wordCount1').get(function() {
    console.log("hi");
    return this.words.length;
});
*/

module.exports = mongoose.model('quiz', QuizSchema);