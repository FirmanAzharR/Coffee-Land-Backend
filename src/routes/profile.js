const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const uploadImg = require('../middleware/multer_profile')

module.exports = router

const {
  getProfile,
  updateProfile,
  updatePassword,
  updateForgotPass
} = require('../controller/profile')

router.get('/:id', authorization, getProfile)
router.patch('/:id', authorization, uploadImg, updateProfile)
router.patch('/password/:id', authorization, updatePassword)
router.patch('/forgot/password/update', updateForgotPass)
