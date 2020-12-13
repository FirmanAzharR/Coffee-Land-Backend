const router = require('express').Router()
module.exports = router
const { getTransaction, getDetailTransaction } = require('../controller/transaction')

router.get('/:id', getTransaction)
router.get('/detail/:id', getDetailTransaction)
