const router = require('express').Router()
module.exports = router
const { getProduct, getProductById } = require('../controller/product')
router.get('/', getProduct)
router.get('/:id', getProductById)
