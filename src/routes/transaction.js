const router = require('express').Router()
module.exports = router
const {
  getTransaction,
  getDetailTransaction
} = require('../controller/transaction')
const {
  getTransactionRedis,
  getTransactionByIdRedis
} = require('../middleware/redis')
const { authorization } = require('../middleware/auth')
router.get('/:id', authorization, getTransactionRedis, getTransaction)
router.get(
  '/detail/:id',
  authorization,
  getTransactionByIdRedis,
  getDetailTransaction
)
