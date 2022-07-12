const e = require('express')
const bcrypt = require('bcrypt')

const db = require('../db/index')
const jwt= require('jsonwebtoken')
const config = require('../config')
exports.reguser = (req, res) => {
  const userInfo = req.body
  if (!userInfo.username || !userInfo.password) {
    return res.send({ status: 1, message: '用户名或密码不能为空' })
  }
  db.query(
    'select * from ev_users where username=?',
    [userInfo.username],
    (err, results) => {
      if (err) return res.cc(err)
      if (results.length > 0) return res.send('用户名已存在')
      db.query(
        'insert into ev_users set ?',
        {
          username: userInfo.username,
          password: bcrypt.hashSync(userInfo.password, 10)
        },
        function (err, results) {
          if (err) return res.cc(err)
          return res.send({ status: 0, message: '注册成功！' })
        }
      )
    }
  )
}

exports.login = (req, res) => {
  const userInfo = req.body
  db.query('select * from ev_users where username=?',userInfo.username,(err,results)=>{
    //数据库查询错误
    if(err){
      res.cc(err)
    }

    //密码错误
    const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
    if(!compareResult){
      res.cc('密码错误，请重试')
    }

    //正常查出数据后的处理(记得加user_pic字段)
    const user = {...results[0],password:'', user_pic:''}//此处是es6高级语法
    const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'})
    res.send({
      status:0,
      message:'登录成功',
      token:'Bearer '+tokenStr
    })
  })
}
