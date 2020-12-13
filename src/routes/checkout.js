const router = require('express').Router()
module.exports = router

const { getCheckout, removeItem, editItem, postDataCheckout } = require('../controller/checkout')

router.post('/', getCheckout)
router.get('/:id', removeItem)
router.patch('/:id', editItem)
router.post('/confirm', postDataCheckout)
