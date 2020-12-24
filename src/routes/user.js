const router = require('express').Router()
module.exports = router

const { registerUser, loginUser } = require('../controller/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
