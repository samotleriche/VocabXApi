const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
var natural = require("natural");
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

var Analyzer = require("natural").SentimentAnalyzer;
var stemmer = require("natural").PorterStemmer;

// @desc    Get top 10 terms (tfIdf)
// @route   Get /api/v1/nlp
// @access  Public
exports.getText = asyncHandler(async (req, res, next) => {
  var tokenizer = new natural.WordTokenizer();
  let stemAndToken = new natural.PorterStemmer.attach();
  let NGrams = natural.NGrams;

  let { text } = req.body;

  text = text.tokenizeAndStem();
  console.log(text);

  tfidf.addDocument(text);

  tfidf.listTerms(0).forEach(item => {
    console.log(item.term + ": " + item.tfidf);
  });

  const result = text;

  res.status(200).json({
    success: true,
    data: result
  });
});

// @desc    Get text sentiment
// @route   Get /api/v1/nlp/getSentiment
// @access  Public
exports.getSentiment = asyncHandler(async (req, res, next) => {
  const analyzer = new Analyzer("English", stemmer, "afinn");
  let stemAndToken = new natural.PorterStemmer.attach();

  let { text } = req.body;

  text = text.tokenizeAndStem();

  const result = analyzer.getSentiment(text);

  res.status(200).json({
    success: true,
    data: result
  });
});

// @desc    Get text classify
// @route   Get /api/v1/nlp/classify
// @access  Public
exports.getClassify = asyncHandler(async (req, res, next) => {
    let classifier = new natural.BayesClassifier();
    let stemAndToken = new natural.PorterStemmer.attach();

    let { text, test } = req.body;

    const inputLength = text.length;

    for(let x = 0; x < inputLength; x++){
        if (x >= inputLength/2)
            classifier.addDocument(text[x], 'good');
        else
            classifier.addDocument(text[x], 'bad');
    }

    classifier.train();

    //text = text.tokenizeAndStem();

    console.log(classifier.getClassifications(test));
  
    const result = classifier.classify(text);
  
    res.status(200).json({
      success: true,
      data: result
    });
  });
