const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')

module.exports = router

const { getSubMonth, dashboard } = require('../controller/dashboard')
router.get('/', authorization, isAdmin, dashboard)
router.get('/chart/:filter', getSubMonth)
