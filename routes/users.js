const express = require('express');
const 
{ 
    getUser, 
    getUsers, 
    updateUser, 
    createUser, 
    deleteUser,
    getUserInRadius
} = require('../controllers/users')

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getUserInRadius);

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;