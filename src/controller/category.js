const { getCategoryModel } = require('../model/category')
const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getCategory: async (request, response) => {
    try {
      const result = await getCategoryModel()
      client.setex('getcategory', 3600, JSON.stringify(result))
      return helper.response(response, 200, 'Success Get Product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
