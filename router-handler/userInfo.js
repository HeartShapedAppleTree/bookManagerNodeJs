const db = require('../db/index')
const bcrypt = require('bcrypt')
exports.getUserInfo = function (req, res) {
  console.log(req.query)
  db.query(
    'select * from ev_users where id = ?',
    req.query.id,
    (err, results) => {
      if (err) {
        return res.cc(err)
      }
      if (results.length !== 1) return res.cc('用户信息查询失败')
      res.send({ status: 0, message: '查询成功', data: results[0] })
    }
  )
}

exports.updateUserInfo = function (req, res) {
  db.query(
    'update ev_users set ? where id=?',
    [req.body, req.body.id],
    (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows != 1) return res.cc('修改用户信息失败')
      res.cc('更新成功', 0)
    }
  )
}

exports.resetPwd = function (req, res) {
  db.query(
    'select * from ev_users where id = ?',
    req.body.id,
    (err, results) => {
      console.log(results)
      if (err) return res.cc(err)
      if (results.length !== 1) return res.cc('用户不存在')
      if (!bcrypt.compareSync(req.body.oldPassword, results[0].password))
        return res.cc('旧密码错误')
      db.query(
        'update ev_users set password = ? where id = ?',
        [bcrypt.hashSync(req.body.newPassword, 10), req.body.id],
        (err, results) => {
          if (err) {
            return res.cc(err)
          }
          if (results.affectedRows !== 1) {
            return res.cc('修改失败')
          }
          return res.cc('密码修改成功')
        }
      )
    }
  )
}

exports.updateAvatar = function (req, res) {
  db.query(
    'update ev_users set user_pic =? where id = ?',
    [req.body.avatar, req.body.id],
    (err, results) => {
      if (err) res.cc(err)
      if (results.affectedRows !== 1) {
        return res.cc('修改失败')
      }
      res.cc('修改成功')
    }
  )
}
