const express = require('express');

const router = express.Router();
//routing signUp function from the controllers folder
const { signUp, signIn, getUsers } = require('../controllers/User')

router.post('/signup', signUp);
router.post('/signin', signIn)
router.get('/', getUsers)


module.exports = router;