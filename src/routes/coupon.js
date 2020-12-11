const router = require('express').Router()
module.exports = router

const { getCoupon, getCouponById } = require('../controller/coupon')

router.get('/', getCoupon)
router.get('/:id', getCouponById)
