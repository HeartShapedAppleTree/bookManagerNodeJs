const joi = require('joi')
const name = joi
  .string()
  .max(8)
  .required()
const alias = joi
  .string()
  .max(30)
  .required()
exports.add_article_cate = {
  body: {
    name,
    alias
  }
}
