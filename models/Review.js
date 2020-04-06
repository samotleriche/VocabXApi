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

// Prevent user from making more than one review per quiz
ReviewSchema.index({ quiz: 1, user: 1 }, { unique: true });

ReviewSchema.pre("save", function(next) {
  this.title =
    this.title.charAt(0).toUpperCase() + this.title.substr(1).toLowerCase();
  next();
});

// Static method to get the count of reviews
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
      reviewCount: obj[0].reviewCount
    });
  } catch (err) {
    console.error(err);
  }
  console.log(obj);
};

// Call getTotalReviews after save
ReviewSchema.post("save", function() {
  this.constructor.getReviewCount(this.quiz);
});

// Call getTotalReviews before remove
ReviewSchema.pre("remove", function() {
  this.constructor.getReviewCount(this.quiz);
});

module.exports = mongoose.model("review", ReviewSchema);
