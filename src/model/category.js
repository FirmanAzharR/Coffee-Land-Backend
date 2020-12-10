const connection = require('../config/mysql')

module.exports = {
  getCategoryModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT*FROM category', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
