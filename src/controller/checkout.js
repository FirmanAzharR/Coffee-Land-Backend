const helper = require('../helper/response')
const {
  getDataCheckoutModel,
  postCheckoutModel,
  postDataCheckoutModel,
  updateStockModel
} = require('../model/checkout')
const { getDetailProductByIdModel } = require('../model/product')

const dataCheckout = []
let subTotalHarga = 0
module.exports = {
  getCheckout: async (request, response) => {
    try {
      const newOrderData = []
      let subtotal = 0
      dataCheckout.push(request.body)
      // hanya untuk menampilkan data secara lengkap
      for (let i = 0; i < dataCheckout.length; i++) {
        const result = await getDataCheckoutModel(
          dataCheckout[i].id_product_detail
        )
        const {
          id_product_detail,
          product_name,
          size_name,
          product_price
        } = result[0]
        const data = {
          id_product_detail,
          product_name,
          size_name,
          quantity: dataCheckout[i].quantity,
          product_price: product_price * dataCheckout[i].quantity,
          deliveryMethod: dataCheckout[i].deliveryMethod
        }
        newOrderData.push(data)
        subtotal = subtotal + data.product_price
        subTotalHarga = subtotal
      }
      console.log(subTotalHarga)
      // end
      return helper.response(response, 200, 'Success Get Checkout', [
        newOrderData,
        { subtotal: subtotal }
      ])
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
        const result = await getDataCheckoutModel(
          dataCheckout[i].id_product_detail
        )
        const {
          id_product_detail,
          product_name,
          size_name,
          product_price
        } = result[0]
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

      return helper.response(
        response,
        200,
        'Current Item on Checkout',
        showData
      )
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
        const result = await getDataCheckoutModel(
          dataCheckout[i].id_product_detail
        )
        const {
          id_product_detail,
          product_name,
          size_name,
          product_price
        } = result[0]
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
      return helper.response(
        response,
        200,
        'Current Item on Checkout',
        showData
      )
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postDataCheckout: async (request, response) => {
    try {
      const {
        customer_id,
        transaction_number,
        address,
        id_payment
      } = request.body
      const transactionData = {
        customer_id,
        transaction_number,
        address,
        id_payment,
        subtotal: subTotalHarga,
        transaction_created_at: new Date()
      }
      const transactionResult = await postCheckoutModel(transactionData)
      const transactionId = transactionResult.transaction_id
      const resultDt = []
      for (let i = 0; i < dataCheckout.length; i++) {
        const { id_product_detail, deliveryMethod, quantity } = dataCheckout[i]
        const objectData = {
          transaction_id: transactionId,
          id_product_detail,
          quantity,
          deliveryMethod,
          detail_created_at: new Date()
        }
        const detailTransResult = await postDataCheckoutModel(objectData)
        const getProductId = await getDetailProductByIdModel(
          objectData.id_product_detail
        )
        const updateStok = await updateStockModel(
          getProductId[0].product_id,
          objectData.quantity
        )
        resultDt.push(detailTransResult)
      }

      return helper.response(response, 200, 'post Checkout success', [
        transactionData,
        resultDt
      ])
    } catch (error) {
      console.log(error)
    }
  }
}
