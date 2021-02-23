const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const { registerUserModel, checkEmailModel } = require('../model/user')
const nodemailer = require('nodemailer')
const { updateProfileModel } = require('../model/profile')
module.exports = {
  registerUser: async (request, response) => {
    try {
      const { user_name, user_email, user_phone, user_password } = request.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)

      const setData = {
        user_role: 2,
        user_name,
        user_email,
        user_phone,
        user_password: encryptPassword,
        user_status: 2,
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
          return helper.response(response, 400, 'wrong password')
        }
      } else {
        return helper.response(response, 400, 'email not registered')
      }
    } catch (error) {
      return helper.response(response, 400, 'bad request', error)
    }
  },
  forgotPass: async (request, response) => {
    try {
      const { email } = request.body
      const checkMail = await checkEmailModel(email)
      console.log(email)
      console.log(checkMail)
      if (checkMail.length > 0) {
        const id = checkMail[0].user_id
        const tokenPass = {
          key_reset: require('crypto').randomBytes(15).toString('hex')
        }
        const result = await updateProfileModel(tokenPass, id)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          secure: false,
          auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.PASS}`
          }
        })
        const mailOPtion = {
          from: `"CoffeeLand "${process.env.EMAIL}`,
          to: `${email}`,
          subject: `Hello ${email}`,
          html: `<a href="https://coffeeland-shop.netlify.app/login?key=${result.key_reset}&page=reset">Click This link to update your password</a>`
        }
        transporter.sendMail(mailOPtion, (err, result) => {
          if (err) {
            return helper.response(response, 400, 'Error Send Email', err)
          } else {
            return helper.response(
              response,
              200,
              'Check your email to renew your password'
            )
          }
        })
      } else {
        return helper.response(response, 400, 'email not registered')
      }
    } catch (error) {
      return helper.response(response, 400, 'bad request', error)
    }
  }
}
