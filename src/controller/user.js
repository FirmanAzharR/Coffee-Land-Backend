const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const { registerUserModel, checkEmailModel } = require('../model/user')

module.exports = {
  registerUser: async (request, response) => {
    try {
      const { user_name, user_email, user_phone, user_password } = request.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)

      const setData = {
        user_role: 1,
        user_name,
        user_email,
        user_phone,
        user_password: encryptPassword,
        user_status: 1,
        user_img: 'none',
        user_created_at: new Date()
      }
      const checkMail = await checkEmailModel(user_email)
      if (checkMail.length > 0) {
        return helper.response(response, 400, 'Email alredy used')
      } else {
        const result = await registerUserModel(setData)
        return helper.response(response, 200, 'success', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'bad request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      const checkDataUser = await checkEmailModel(user_email)
      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        )
        if (checkPassword) {
          const {
            user_id,
            user_role,
            user_name,
            user_email,
            user_status
          } = checkDataUser[0]
          const payload = {
            user_id,
            user_role,
            user_name,
            user_email,
            user_status
          }
          const token = jwt.sign(payload, 'secret', { expiresIn: '3h' })
          const result = { ...payload, token }
          return helper.response(response, 200, 'success login', result)
        } else {
          return helper.response(response, 400, 'wrong registered')
        }
      } else {
        return helper.response(response, 400, 'email not registered')
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'email not registered', error)
    }
  }
}
