const router = require('express').Router()

const uploadImg = require('../middleware/multer')
const {
  getProductByIdRedis,
  clearDataProductRedis,
  getProductRedis
} = require('../middleware/redis')
const { authorization, isAdmin } = require('../middleware/auth')
module.exports = router
const {
  getProduct,
  getProductById,
  getDetailProductById,
  postProduct,
  patchProduct,
  patchDetailProduct,
  deleteProduct
} = require('../controller/product')

router.get('/', authorization, getProductRedis, getProduct)
router.get('/:id', authorization, getProductByIdRedis, getProductById)
router.get('/productDetail/:id', authorization, getDetailProductById)
router.post(
  '/',
  authorization,
  isAdmin,
  clearDataProductRedis,
  uploadImg,
  postProduct
)
router.patch(
  '/:id',
  authorization,
  isAdmin,
  uploadImg,
  clearDataProductRedis,
  patchProduct
)
router.patch(
  '/productDetail/:id',
  authorization,
  isAdmin,
  clearDataProductRedis,
  patchDetailProduct
)
router.delete(
  '/:id',
  authorization,
  isAdmin,
  clearDataProductRedis,
  deleteProduct
)
