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
  },
  postProductModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO product SET ?', data, (error, result) => {
        if (!error) {
          const insertResult = {
            product_id: result.insertId,
            ...data
          }
          resolve(insertResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  patchProductModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE product SET ? WHERE product_id = ?', [data, id], (error, result) => {
        if (!error) {
          const updateResult = {
            product_id: id,
            ...data
          }
          resolve(updateResult)
        } else {
          reject(error)
        }
      })
    })
  }
}
