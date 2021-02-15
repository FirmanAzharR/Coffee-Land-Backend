const connection = require('../config/mysql')

module.exports = {
  getProfileModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT*FROM user WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateProfileModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [data, id],
        (error, result) => {
          if (!error) {
            const updateResult = {
              user_id: id,
              ...data
            }
            resolve(updateResult)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  updatePassModel: (data, key) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE key_reset = ?',
        [data, key],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  checkKeyModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT key_reset FROM user WHERE key_reset = ?',
        data,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  }
}
