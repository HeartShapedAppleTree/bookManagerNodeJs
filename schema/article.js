const joi = require('joi')
const content = joi
  .string()
  .min(1)
  .max(1000)
  .required()
const title = joi
  .string()
  .max(50)
  .required()
const state = joi
  .string()
  .valid('草稿', '已发布')
  .required()
const cate_id = joi
  .string()
  .max(10)
  .required()

exports.add_article = {
  body: {
    title: title,
    state: state,
    content,
    cate_id
  }
}
