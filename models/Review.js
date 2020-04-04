const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for review"],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, "Please add some text"]
  },
  rating: {
    type: Number,
    required: [true, "Please add a rating between 1 and 5"],
    min: 1,
    max: 5
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: "quiz",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true
  }
});

ReviewSchema.pre("save", function(next) {
  this.title =
    this.title.charAt(0).toUpperCase() + this.title.substr(1).toLowerCase();
  next();
});

// Static method to get the count of words
ReviewSchema.statics.getReviewCount = async function(quizId) {
  const obj = await this.aggregate([
    {
      $match: { quiz: quizId }
    },
    {
      $group: {
        _id: "$quiz",
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  try {
    await this.model("quiz").findByIdAndUpdate(quizId, {
      wordCount: obj[0].wordCount
    });
  } catch (err) {
    console.error(err);
  }
  console.log(obj);
};

// Call getTotalCourses after save
ReviewSchema.post("save", function() {
  this.constructor.getWordCount(this.quiz);
});

// Call getTotalCourses before remove
ReviewSchema.pre("remove", function() {
  this.constructor.getWordCount(this.quiz);
});

module.exports = mongoose.model("review", ReviewSchema);
