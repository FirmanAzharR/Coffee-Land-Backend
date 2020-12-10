const router = require('express').Router()
module.exports = router
const { getProduct, getProductById, postProduct, patchProduct } = require('../controller/product')

router.get('/', getProduct)
router.get('/:id', getProductById)
router.post('/', postProduct)
router.post('/:id', patchProduct)
