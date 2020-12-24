const router = require('express').Router()
const product = require('./routes/product')
const category = require('./routes/category')
const coupon = require('./routes/coupon')
const checkout = require('./routes/checkout')
const transaction = require('./routes/transaction')
const user = require('./routes/user')

router.use('/user', user)
router.use('/product', product)
router.use('/category', category)
router.use('/coupon', coupon)
router.use('/checkout', checkout)
router.use('/transaction', transaction)

module.exports = router
