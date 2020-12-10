const router = require('express').Router()
module.exports = router
const { getProduct, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')
const { getCategory } = require('../controller/category')

router.get('/', getProduct)
router.get('/:id', getProductById)
router.post('/', postProduct)
router.post('/:id', patchProduct)
router.delete('/:id', deleteProduct)
