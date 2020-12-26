const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di redis')
        return helper.response(
          response,
          200,
          'success get product by id',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada di redis')
        next()
      }
    })
  },
  clearDataProductRedis: (request, response, next) => {
    client.keys('getproduct*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getProductRedis: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          const newResult = JSON.parse(result)
          console.log('data ada di redis')
          return helper.response(
            response,
            200,
            'success get product by id',
            newResult.result,
            newResult.pageInfo
          )
        } else {
          console.log('data tidak ada di redis')
          next()
        }
      }
    )
  },
  getCuponRedis: (_request, response, next) => {
    client.get('getcupon', (error, result) => {
      if (!error && result != null) {
        const newResult = JSON.parse(result)
        console.log('data ada di redis')
        return helper.response(response, 200, 'success get cupon', newResult)
      } else {
        console.log('data tidak ada di redis')
        next()
      }
    })
  },
  clearCuponRedis: (request, response, next) => {
    client.keys('getcupon*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getCuponByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getcuponbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di redis')
        return helper.response(
          response,
          200,
          'success get coupon by id',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada di redis')
        next()
      }
    })
  },
  getTransactionRedis: (_request, response, next) => {
    client.get('gettransaction', (error, result) => {
      if (!error && result != null) {
        const newResult = JSON.parse(result)
        console.log('data ada di redis')
        return helper.response(response, 200, 'success get cupon', newResult)
      } else {
        console.log('data tidak ada di redis')
        next()
      }
    })
  },
  getTransactionByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`gettransaction:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di redis')
        return helper.response(
          response,
          200,
          'success get coupon by id',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada di redis')
        next()
      }
    })
  },
  clearTransactionRedis: (request, response, next) => {
    client.keys('gettransaction*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  }
}
