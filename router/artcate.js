const express = require('express')
const expressJoi = require('@escook/express-joi')
const router = express.Router()
const artcateHandler = require('./../router-handler/artcate')
const {
  add_article_cate,
  get_articel_cate_by_id
} = require('../schema/artcate')
router.get('/cates', artcateHandler.getArticleCates)
router.post(
  '/cates',
  expressJoi(add_article_cate),
  artcateHandler.addArticleCate
)
router.get(
  '/cates/:id',
  expressJoi(get_articel_cate_by_id),
  artcateHandler.getArticleCateById
)
module.exports = router
