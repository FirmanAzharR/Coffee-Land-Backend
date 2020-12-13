const { getProductModel, getProductCountModel, getProductByIdModel, getDetailProductByIdModel, postProductModel, postDetailProductModel, patchProductModel, patchDetailProductModel, deleteProductModel, deleteDetailProductModel } = require('../model/product')

const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getProduct: async (request, response) => {
    try {
      let { page, limit, search, sort } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      if (search !== '') {
        page = 1
      }
      if (sort === '') {
        sort = 'product.category_id ASC'
      }
      const totalData = await getProductCountModel()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const result = await getProductModel(limit, offset, search, sort)
      const prevLink = page > 1 ? qs.stringify({ ...request.query, ...{ page: page - 1 } }) : null
      const nextLink = page < totalPage ? qs.stringify({ ...request.query, ...{ page: page + 1 } }) : null
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:5000/product?${nextLink}`,
        prevLink: prevLink && `http://localhost:5000/product?${prevLink}`
      }
      console.log(search)
      console.log(sort)
      return helper.response(response, 200, 'Success Get Product', result, pageInfo)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
        return helper.response(response, 200, 'Success Get Product By Id', result)
      } else {
        return helper.response(response, 404, `Product by id ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getDetailProductById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getDetailProductByIdModel(id)
      if (result.length > 0) {
        return helper.response(response, 200, 'Success Get Product By Id', result)
      } else {
        return helper.response(response, 404, `Product by id ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    const { category_id, product_name, product_discon, product_information, product_img, product_status, product_stock, id_size, product_price, p_detail_status } = request.body
    const dataProduct = {
      category_id,
      product_name,
      product_discon,
      product_information,
      product_img,
      product_created_at: new Date(),
      product_status,
      product_stock
    }

    try {
      const resultDetails = []
      const resultProduct = await postProductModel(dataProduct)
      const dt = {
        id_product: resultProduct.product_id,
        id_size: JSON.parse('[' + id_size + ']'),
        product_price: JSON.parse('[' + product_price + ']'),
        p_detail_created_at: new Date(),
        p_detail_status
      }
      const countDataDetail = dt.id_size.length

      for (let i = 0; i < countDataDetail; i++) {
        const InsertDetail = await postDetailProductModel(
          dt.id_product, dt.id_size[i], dt.product_price[i], dt.p_detail_created_at, dt.p_detail_status
        )
        resultDetails.push(InsertDetail)
      }
      helper.response(response, 200, 'Success Insert Data', [resultProduct, resultDetails])
    } catch (error) {
      console.log(error)
      helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const { category_id, product_name, product_discon, product_information, product_img, product_status, product_stock } = request.body

      const data = { category_id, product_name, product_discon, product_information, product_img, product_updated_at: new Date(), product_status, product_stock }
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchProductModel(data, id)
        helper.response(response, 200, `Success Update Product by Id ${id}`, result)
      } else {
        helper.response(response, 400, `Product by id ${id} not found`)
      }
    } catch (error) {
      helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchDetailProduct: async (request, response) => {
    try {
      const { id } = request.params
      const {
        id_size,
        product_price,
        p_detail_status
      } = request.body

      const data = {
        id_size,
        product_price,
        p_detail_update_at: new Date(),
        p_detail_status
      }
      const checkId = await getDetailProductByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchDetailProductModel(data, id)
        helper.response(response, 200, `Success Update Product by Id ${id}`, result)
      } else {
        helper.response(response, 400, `Product by id ${id} not found`)
      }
    } catch (error) {
      helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params
      const cekId = await getProductByIdModel(id)
      if (cekId.length > 0) {
        const data = cekId[0]
        const deleteDetail = await deleteDetailProductModel(id)
        const result = await deleteProductModel(data, id)
        helper.response(response, 200, `Data by ID ${id} Deleted Successfully`, result)
      } else {
        helper.response(response, 400, `Product by id ${id} not found`)
      }
    } catch (error) {
      helper.response(response, 400, 'Bad Request', error)
    }
  }
}
