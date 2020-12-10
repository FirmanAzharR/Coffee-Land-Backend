const { getCategoryModel } = require('../model/category')

const helper = require('../helper/response')

module.exports = {
  getCategory: async (request, response) => {
    try {
      const result = await getCategoryModel()
      return helper.response(response, 200, 'Success Get Product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
