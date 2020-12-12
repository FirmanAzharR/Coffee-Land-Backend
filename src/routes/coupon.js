const router = require('express').Router()
module.exports = router

const { getCoupon, getCouponById, postCoupon, deleteCoupon, patchCoupon } = require('../controller/coupon')

router.get('/', getCoupon)
router.get('/:id', getCouponById)
router.post('/', postCoupon)
router.delete('/:id', deleteCoupon)
router.patch('/:id', patchCoupon)
