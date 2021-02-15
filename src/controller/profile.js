const {
  getProfileModel,
  updateProfileModel,
  updatePassModel,
  checkKeyModel
} = require('../model/profile')
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
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  updateProfile: async (request, response) => {
    try {
      const { id } = request.params
      const {
        user_name,
        first_name,
        last_name,
        user_address,
        user_email,
        user_phone
      } = request.body

      // const salt = bcrypt.genSaltSync(10)
      // const encryptPassword = bcrypt.hashSync(user_password, salt)

      const data = {
        user_name,
        first_name,
        last_name,
        user_address,
        user_email,
        user_phone,
        user_img: request.file === undefined ? '' : request.file.filename,
        user_updated_at: new Date()
      }
      const cekProfile = await getProfileModel(id)
      if (cekProfile.length > 0) {
        if (data.user_img) {
          if (data.user_img !== cekProfile[0].user_img) {
            fs.unlink(
              `./upload/profile/${cekProfile[0].user_img}`,
              function (err) {
                if (err) {
                  console.log('image not found')
                }
                console.log('Image Update Old File deleted!')
              }
            )
          }
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
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  updatePassword: async (request, response) => {
    try {
      const { old_pass, new_pass } = request.body
      const { id } = request.params
      const checkDataUser = await getProfileModel(id)
      const checkPassword = bcrypt.compareSync(
        old_pass,
        checkDataUser[0].user_password
      )

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(new_pass, salt)

      if (checkPassword) {
        const data = {
          user_password: encryptPassword
        }
        const result = updateProfileModel(data, id)
        return helper.response(response, 200, 'Success change password')
      } else {
        return helper.response(response, 400, 'Wrong password')
      }
    } catch (error) {
      return helper.response(response, 400, 'Failed change password', error)
    }
  },
  updateForgotPass: async (request, response) => {
    try {
      const { new_pass, key_reset } = request.body
      const cekKey = await checkKeyModel(key_reset)
      if (cekKey.length > 0) {
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(new_pass, salt)
        const data = {
          user_password: encryptPassword
        }
        await updatePassModel(data, key_reset)
        return helper.response(response, 200, 'Success change password')
      } else {
        return helper.response(
          response,
          400,
          'Failed change password Key not match'
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
