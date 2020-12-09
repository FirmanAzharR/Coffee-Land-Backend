const connection = require('../config/mysql')

module.exports = {
  getProductModel: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT*FROM product LIMIT ? OFFSET ?', [limit, offset], (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getProductCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS total_product FROM product', (error, result) => {
        !error ? resolve(result[0].total_product) : reject(new Error(error))
      })
    })
  },
  getProductByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT*FROM product WHERE product_id = ${id}`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
