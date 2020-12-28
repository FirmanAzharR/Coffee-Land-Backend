const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const uploadImg = require('../middleware/multer_profile')
const { getProfileRedis, clearProfileRedis } = require('../middleware/redis')

module.exports = router

const { getProfile, updateProfile } = require('../controller/profile')

router.get('/:id', authorization, getProfileRedis, getProfile)
router.patch(
  '/update/:id',
  authorization,
  uploadImg,
  clearProfileRedis,
  updateProfile
)
