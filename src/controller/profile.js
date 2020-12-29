const { getProfileModel, updateProfileModel } = require('../model/profile')
const helper = require('../helper/response')
const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()
const bcrypt = require('bcrypt')

module.exports = {
  getProfile: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProfileModel(id)
      client.setex(`getprofile:${id}`, 3600, JSON.stringify(result))
      return helper.response(response, 200, 'Success Get Profile', result)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  updateProfile: async (request, response) => {
    try {
      const { id } = request.params
      const { user_name, user_email, user_phone, user_password } = request.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)

      const data = {
        user_name,
        user_email,
        user_phone,
        user_password: encryptPassword,
        user_img: request.file === undefined ? '' : request.file.filename
      }
      const cekProfile = await getProfileModel(id)
      if (cekProfile.length > 0) {
        if (data.user_img) {
          fs.unlink(
            `./upload/profile/${cekProfile[0].user_img}`,
            function (err) {
              if (err) {
                console.log('image not found')
              }
              console.log('Image Update Old File deleted!')
            }
          )
        } else {
          delete data.user_img
          console.log('Update without img!')
        }
        const result = await updateProfileModel(data, id)
        return helper.response(response, 200, 'Success Update Profile', result)
      } else {
        return helper.response(response, 400, 'User Profile Not Found')
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
