const multer = require('multer')
const helper = require('../helper/response')
// const fs = require('fs')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/profile')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Extension File Must be PNG or JPG'), false)
  }
}

// kondisi kedua limit
const limits = {
  fileSize: 1 * 1024 * 1024 // 1 MB (max file size)
}

const upload = multer({ storage, limits, fileFilter }).single('user_img')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err.message)
      return helper.response(res, 400, err.message)
    } else if (err) {
      // An unknown error occurred when uploading.
      return helper.response(res, 400, err.message)
    }
    next()
    // Everything went fine.
  })
}

module.exports = uploadFilter
