const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routesNavigation = require('./src/routesNavigation')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routesNavigation)

app.get('*', (req, res) => {
  res.status(404).send('Path not found')
})

app.listen(5000, () => {
  console.log('xpress app is listening on port 5000')
})
