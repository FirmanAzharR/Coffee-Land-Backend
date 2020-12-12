const response = require('../helper/response')
const helper = require('../helper/response')
const { getDataCheckoutModel } = require('../model/checkout')
const { get } = require('../routes/checkout')

const dataCheckout = []

module.exports = {
  getCheckout: async (request, response) => {
    try {
      const newOrderData = []
      dataCheckout.push(request.body)
      // hanya untuk menampilkan data secara lengkap
      for (let i = 0; i < dataCheckout.length; i++) {
        const result = await getDataCheckoutModel(dataCheckout[i].id_product_detail)
        const { id_product_detail, product_name, size_name, product_price } = result[0]
        const data = {
          id_product_detail,
          product_name,
          size_name,
          quantity: dataCheckout[i].quantity,
          product_price: product_price * dataCheckout[i].quantity,
          deliveryMethod: dataCheckout[i].deliveryMethod
        }
        newOrderData.push(data)
      }
      // end
      return helper.response(response, 200, 'Success Get Checkout', newOrderData)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  removeItem: async (request, response) => {
    try {
      const showData = []

      const { id } = request.params
      const findItem = await dataCheckout.find((x, y) => {
        let dataRemove
        if (x.id_product_detail === id) {
          dataRemove = dataCheckout.splice(y, 1)
        }
        return dataRemove
      })

      // hanya untuk menampilkan data secara lengkap
      for (let i = 0; i < dataCheckout.length; i++) {
        const result = await getDataCheckoutModel(dataCheckout[i].id_product_detail)
        const { id_product_detail, product_name, size_name, product_price } = result[0]
        const data = {
          id_product_detail,
          product_name,
          size_name,
          quantity: dataCheckout[i].quantity,
          product_price: product_price * dataCheckout[i].quantity,
          deliveryMethod: dataCheckout[i].deliveryMethod

        }
        showData.push(data)
      }
      // end

      return helper.response(response, 200, 'Current Item on Checkout', showData)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  editItem: async (request, response) => {
    try {
      const showData = []
      const { id } = request.params
      const { deliveryMethod, quantity } = request.body
      const newData = {
        id_product_detail: id,
        deliveryMethod,
        quantity
      }
      // console.log(newData)
      const findItem = await dataCheckout.find((x, y) => {
        let editData
        if (x.id_product_detail === id) {
          editData = dataCheckout.splice(y, 1, newData)
        }
        return editData
      })
      // console.log(findItem)
      // console.log(dataCheckout)
      // hanya untuk menampilkan data secara lengkap
      for (let i = 0; i < dataCheckout.length; i++) {
        const result = await getDataCheckoutModel(dataCheckout[i].id_product_detail)
        const { id_product_detail, product_name, size_name, product_price } = result[0]
        const data = {
          id_product_detail,
          product_name,
          size_name,
          quantity: dataCheckout[i].quantity,
          product_price: product_price * dataCheckout[i].quantity,
          deliveryMethod: dataCheckout[i].deliveryMethod

        }
        showData.push(data)
      }
      // end
      return helper.response(response, 200, 'Current Item on Checkout', showData)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  }

}
