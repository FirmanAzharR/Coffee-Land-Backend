const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routesNavigation = require('./src/routesNavigation')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  // response.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5000/')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Authorization'
  )
  next()
})

app.use('/', routesNavigation)
app.get('*', (req, res) => {
  res.status(404).send('Path not found')
})

app.listen(5000, () => {
  console.log('xpress app is listening on port 5000')
})
