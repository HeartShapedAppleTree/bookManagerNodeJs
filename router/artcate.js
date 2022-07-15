const express = require('express')
const expressJoi = require('@escook/express-joi')
const router = express.Router()
const artcateHandler = require('./../router-handler/artcate')
const {
  add_article_cate,
  get_article_cate_by_id,
  update_article_cate
} = require('../schema/artcate')
router.get('/cates', artcateHandler.getArticleCates)
router.post(
  '/cates',
  expressJoi(add_article_cate),
  artcateHandler.addArticleCate
)
router.get(
  '/cates/:id',
  expressJoi(get_article_cate_by_id),
  artcateHandler.getArticleCateById
)
router.post(
  '/updatecate',
  expressJoi(update_article_cate),
  artcateHandler.updateArticleCateById
)
module.exports = router
