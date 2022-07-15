const express = require('express')
const path = require('path')
const multer = require('multer')
const expressJoi = require('@escook/express-joi')
const { add_article } = require('../schema/article')
const article_handler = require('../router-handler/article')
const upload = multer({ dest: path.join(__dirname, '../uploads') })
const router = express.Router()
router.post(
  '/add',
  upload.single('cover_img'),
  expressJoi(add_article),
  article_handler.addArticle
)

module.exports = router
