const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')
module.exports = router

const { getCategory } = require('../controller/category')

router.get('/', authorization, isAdmin, getCategory)
