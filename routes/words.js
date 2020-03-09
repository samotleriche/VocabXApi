const express = require('express');
const { getWord, getWords, updateWord, createWord, deleteWord} = require('../controllers/words');

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(getWords)
    .post(createWord);

router.route('/:id')
    .get(getWord);
    //.put(updateWord)
    //.delete(deleteWord);

module.exports = router;