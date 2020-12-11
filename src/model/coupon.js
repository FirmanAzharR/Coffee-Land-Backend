const connection = require('../config/mysql')

module.exports = {
  getCouponModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT*FROM coupon', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getCouponByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT*FROM coupon WHERE id_coupon = ${id}`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
