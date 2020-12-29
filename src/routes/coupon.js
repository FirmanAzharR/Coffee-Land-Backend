const router = require('express').Router()
module.exports = router

const {
  getCoupon,
  getCouponById,
  postCoupon,
  deleteCoupon,
  patchCoupon
} = require('../controller/coupon')
const {
  getCuponRedis,
  clearCuponRedis,
  getCuponByIdRedis
} = require('../middleware/redis')
const { authorization, isAdmin } = require('../middleware/auth')
const uploadImg = require('../middleware/multer_coupon')
router.get('/', authorization, getCuponRedis, getCoupon)
router.get('/:id', authorization, getCuponByIdRedis, getCouponById)
router.post('/', authorization, isAdmin, clearCuponRedis, uploadImg, postCoupon)
router.delete('/:id', authorization, isAdmin, clearCuponRedis, deleteCoupon)
router.patch(
  '/:id',
  authorization,
  isAdmin,
  clearCuponRedis,
  uploadImg,
  patchCoupon
)
