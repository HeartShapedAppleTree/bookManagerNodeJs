const joi = require('joi')
const name = joi
  .string()
  .max(8)
  .required()
const alias = joi
  .string()
  .max(30)
  .required()
const id = joi
  .string()
  .min(1)
  .required()
exports.add_article_cate = {
  body: {
    name,
    alias
  }
}

exports.get_article_cate_by_id = {
  params: {
    id
  }
}

exports.update_article_cate = {
  body: {
    id,
    name,
    alias
  }
}
