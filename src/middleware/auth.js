const helper = require('../helper/response')
const jwt = require('jsonwebtoken')

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'secret', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          console.log(error)
          return helper.response(response, 400, error.message)
        } else {
          request.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(response, 400, 'Please Login First!')
    }
  },
  isAdmin: (request, response, next) => {
    console.log(request.decodeToken.user_role)
    if (request.decodeToken.user_role > 1) {
      return helper.response(response, 400, 'You are not admin!')
    } else {
      next()
    }
  }
}
