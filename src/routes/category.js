const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')
const { getCategoryRedis } = require('../middleware/redis')
module.exports = router

const { getCategory } = require('../controller/category')

router.get('/', authorization, getCategoryRedis, getCategory)
