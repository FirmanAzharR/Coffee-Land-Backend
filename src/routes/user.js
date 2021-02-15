const router = require('express').Router()
module.exports = router

const { registerUser, loginUser, forgotPass } = require('../controller/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot', forgotPass)
