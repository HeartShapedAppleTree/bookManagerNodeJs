const express = require('express')
const cors = require('cors')
const joi = require('joi')
const expressJoi = require('@escook/express-joi')
const { expressjwt } = require('express-jwt')

const config = require('./config')
const user = require('./router/user')
const userInfo = require('./router/userInfo')
const artcate = require('./router/artcate')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(
  expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/api\//]
  })
)

//通用的只返回消息的中间件
app.use(function (req, res, next) {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

//使用路由
app.use('/api', user)
app.use('/my', userInfo)
app.use('/my/article', artcate)
//错误级别中间件一定要在所有的路由之后注册
app.use(function (err, req, res, next) {
  // return res.send(err)
  if (err instanceof joi.ValidationError) {
    return res.cc(err.message)
  }
  if (err.name === 'UnauthorizedError') return res.cc('未登录')
  return res.cc(err)
})
app.listen('3007', () => {
  console.log('3007 is on')
})
