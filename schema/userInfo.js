const joi = require('joi')

const username = joi
  .string()
  .max(15)
  .required()
const email = joi
  .string()
  .max(50)
  .email()
  .required()
const id = joi
  .string()
  .min(1)
  .required()
exports.update_userinfo_schema = {
  body: {
    username,
    email,
    id
  }
}
