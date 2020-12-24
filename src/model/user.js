const connection = require('../config/mysql')

module.exports = {
  registerUserModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: result.insertId,
            ...data
          }
          delete newResult.user_password
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  checkEmailModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
    `SELECT*FROM user WHERE user_email = '${email}'`,
    (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(new Error(error))
      }
    }
      )
    })
  }
}
