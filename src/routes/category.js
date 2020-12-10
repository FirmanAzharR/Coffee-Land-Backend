const router = require('express').Router()
module.exports = router

const { getCategory } = require('../controller/category')

router.get('/', getCategory)
