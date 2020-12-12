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
  },
  postCouponByIdModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO coupon SET ?', data, (error, result) => {
        const insertResult = {
          id_coupon: result.insertId,
          ...data
        }
        !error ? resolve(insertResult) : reject(new Error(error))
      })
    })
  },
  deleteCouponByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`DELETE FROM coupon WHERE id_coupon=${id}`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  patchCouponByIdModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE coupon SET ?  WHERE id_coupon = ?', [data, id], (error, result) => {
        const updateResult = {
          id_coupon: id,
          ...data
        }
        !error ? resolve(updateResult) : reject(new Error(error))
      })
    })
  }
}
