const router = require('express').Router()
module.exports = router
const { getProduct, getProductById, getDetailProductById, postProduct, patchProduct, patchDetailProduct, deleteProduct } = require('../controller/product')
const { getCategory } = require('../controller/category')

router.get('/', getProduct)
router.get('/:id', getProductById)
router.get('/productDetail/:id', getDetailProductById)
router.post('/', postProduct)
router.post('/:id', patchProduct)
router.post('/productDetail/:id', patchDetailProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', getCategory)
