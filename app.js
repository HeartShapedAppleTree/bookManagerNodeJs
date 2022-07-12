const express = require('express')
const cors = require('cors')
const user = require('./router/user')
const userInfo = require('./router/userInfo')
const expressJoi = require('@escook/express-joi')
const joi= require('@hapi/joi')
const expressjwt = require('express-jwt')
const config=require('./config')

const app = express()


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(expressjwt({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))

//通用的只返回消息的中间件
app.use(function (req, res, next) {
  res.cc = function (status,err) {
    if (status == 1) {
      res.send({
        status,
        message: err instanceof Error ? err.message : err
      })
    }else{
      res.send({
      status,
      message: err
    })
    }
    
  }
  next()
})

//使用路由
app.use(user)
app.use('/my',userInfo)


//错误级别中间件一定要在所有的路由之后注册
app.use(function(err,req,res,next){
  if(err instanceof joi.ValidationError){
    return res.cc('用户名或密码不符合规则')
  }
  if(err.name==='UnautorizedError') return res.cc('未登录')
  res.cc('未知的错误')
})
app.listen('3007', () => {
  console.log('3007 is on')
})
