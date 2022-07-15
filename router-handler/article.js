const db = require('../db')
const paht = require('path')
exports.addArticle = function (req, res) {
  if (!req.file || req.file.fieldname !== 'cover_img')
    return res.cc('请选择封面') //multer的文件验证无法用joi
  const articleInfo = {
    ...req.body,
    cover_img: path.join('/uploads', req.file.filename),
    pub_date: new Date(),
    authorId: req.user.id
  }
  db.query('insert into ev_article set ?', articleInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('新增失败！')
    res.cc('新增成功！', 0)
  })
}
