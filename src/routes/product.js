const router = require('express').Router()
// const multer = require('multer')
const uploadImg = require('../middleware/multer')
const { getProductByIdRedis, clearDataProductRedis, getProductRedis } = require('../middleware/redis')
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
const { getCategory } = require('../controller/category')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './upload')
//   },
//   filename: function (req, file, cb) {
//     console.log(file)
//     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
//   }
// })
// const upload = multer({ storage: storage })

router.get('/', getProductRedis, getProduct)
router.get('/:id', getProductByIdRedis, getProductById)
router.get('/productDetail/:id', getDetailProductById)
router.post('/', uploadImg, postProduct)
router.patch('/:id', clearDataProductRedis, patchProduct)
router.patch('/productDetail/:id', patchDetailProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', getCategory)
