const router = require('express').Router()
module.exports = router
const {
  getTransaction,
  getDetailTransaction,
  deleteTransactions,
  getTransactionById
} = require('../controller/transaction')
const {
  //getTransactionRedis,
  getTransactionByIdRedis,
  clearTransactionRedis
} = require('../middleware/redis')
const { authorization } = require('../middleware/auth')
router.get('/:id', authorization, /*getTransactionRedis,*/ getTransaction)
router.get(
  '/detail/:id',
  authorization,
  getTransactionByIdRedis,
  getDetailTransaction
)
router.delete('/:id', authorization, clearTransactionRedis, deleteTransactions)
router.get('/get/transaction/:id', authorization, getTransactionById)
