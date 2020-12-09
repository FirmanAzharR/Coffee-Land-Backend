const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.unsubscribe(bodyParser.urlencoded({ extended: false }))

app.listen(3000, () => {
  console.log('xpress app is listening on port 3000')
})
