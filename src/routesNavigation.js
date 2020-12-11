const router = require('express').Router()
const product = require('./routes/product')
const category = require('./routes/category')
const coupon = require('./routes/coupon')
router.use('/product', product)
router.use('/category', category)
router.use('/coupon', coupon)

module.exports = router
