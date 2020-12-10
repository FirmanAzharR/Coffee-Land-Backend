const router = require('express').Router()
const product = require('./routes/product')
const category = require('./routes/category.js')
router.use('/product', product)
router.use('/category', category)

module.exports = router
