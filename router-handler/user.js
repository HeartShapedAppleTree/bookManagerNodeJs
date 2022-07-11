const e = require('express')
const db = require('./../db/index')
const bcrypt = require('bcrypt')
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

exports.login = (req, res) => {}
