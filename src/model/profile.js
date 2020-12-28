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
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
