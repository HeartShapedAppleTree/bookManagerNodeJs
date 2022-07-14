const express = require('express')
const expressJoi = require('@escook/express-joi')
const router = express.Router()
const arcateHandler = require('./../router-handler/artcate')
const { add_article_cate } = require('../schema/artcate')
router.get('/cates', arcateHandler.getArticleCates)
router.post(
  '/cates',
  expressJoi(add_article_cate),
  arcateHandler.addArticleCate
)
module.exports = router
