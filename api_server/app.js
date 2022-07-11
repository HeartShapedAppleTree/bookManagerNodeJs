const express = require('express')
const cors = require('cors')
const user = require('./router/user')

const app = express()

app.listen('3007', () => {
  console.log('3007 is on')
})
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.cc = function (status) {
    if (status == 1) {
      res.send({
        status,
        message: err instanceof Error ? err.message : err
      })
    }
  }
  next()
})
app.use(user)
