const {
  getSubTotalMonth,
  getTransactionNow,
  getTransactionYear,
  totalTransaction
} = require('../model/dashboard')
// const redis = require('redis')
// const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getSubMonth: async (request, response) => {
    try {
      const { filter } = request.body
      const result = await getSubTotalMonth(filter)
      return helper.response(response, 200, 'Success Get Subtotal', result)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  dashboard: async (request, response) => {
    try {
      const today = await getTransactionNow()
      const year = await getTransactionYear()
      const totalTrans = await totalTransaction()
      const result = {
        today: today,
        year: year,
        total: totalTrans
      }
      return helper.response(response, 200, 'success get dashboard', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
