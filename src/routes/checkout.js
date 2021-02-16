const router = require('express').Router()
module.exports = router
const { authorization } = require('../middleware/auth')
const { clearTransactionRedis } = require('../middleware/redis')

const {
  getCheckout,
  removeItem,
  editItem,
  postDataCheckout,
  postDetailCheckout,
  getOrder,
  markDone
} = require('../controller/checkout')

router.post('/', authorization, getCheckout)
router.get('/:id', removeItem)
router.patch('/:id', editItem)
router.post('/confirm', authorization, clearTransactionRedis, postDataCheckout)
router.post(
  '/confirm/detail',
  authorization,
  clearTransactionRedis,
  postDetailCheckout
)
router.get('/confirm/customer-order', authorization, getOrder)
router.patch('/confirm/order-status', authorization, markDone)
