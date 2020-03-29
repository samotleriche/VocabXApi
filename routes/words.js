const express = require('express');
const { 
    getWord, 
    getWords, 
    updateWord,
    createWord, 
    deleteWord,
    wordPhotoUpload
} = require('../controllers/words');

const router = express.Router({ mergeParams: true });

router.route('/:id/photo').put(wordPhotoUpload);

router.route('/')
    .get(getWords)
    .post(createWord);

router.route('/:id')
    .get(getWord)
    .put(updateWord)
    .delete(deleteWord);

module.exports = router;