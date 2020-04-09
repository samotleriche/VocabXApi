const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please add a course title"]
  },
  definition: {
    type: String,
    required: [true, "Please add a definition"]
  },
  POS: {
    type: String,
    required: [true, "Please add a part of speach"],
    enum: ["noun", "verb", "adjective", "adverb"]
  },
  origin: {
    type: String
  },
  pronouce: {
    type: String
  },
  progress: {
    type: String,
    required: [true, "Please add a progress amount"],
    enum: ["none", "learning", "learned"]
  },
  examples: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: true
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: "quiz",
    required: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true
  }
});

WordSchema.pre("save", function(next) {
  this.title =
    this.title.charAt(0).toUpperCase() + this.title.substr(1).toLowerCase();
  next();
});

// Static method to get the count of words
WordSchema.statics.getWordCount = async function(quizId) {
  const obj = await this.aggregate([
    {
      $match: { quiz: quizId }
    },
    {
      $group: {
        _id: "$quiz",
        wordCount: { $sum: 1 }
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
WordSchema.post("save", function() {
  this.constructor.getWordCount(this.quiz);
});

// Call getTotalCourses before remove
WordSchema.pre("remove", function() {
  this.constructor.getWordCount(this.quiz);
});

module.exports = mongoose.model("word", WordSchema);
