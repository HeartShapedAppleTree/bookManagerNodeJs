const db = require('../db')

exports.getArticleCates = function (req, res) {
  db.query(
    'select * from ev_article_cate where is_delete = 0 order by id asc',
    (err, results) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        data: results,
        message: '查询成功'
      })
    }
  )
}

exports.addArticleCate = function (req, res) {
  db.query(
    'select * from ev_article_cate where name = ? or alias = ?',
    [req.body.name, req.body.alias],
    (err, results) => {
      if (err) return res.cc(err)
      if (results.length > 0) return res.cc('分类名或别名被占用，请重试')
      db.query(
        'insert into ev_article_cate set ?',
        req.body,
        (err, results) => {
          if (err) return res.cc(err)
          res.cc('新增成功！', 0)
        }
      )
    }
  )
}
