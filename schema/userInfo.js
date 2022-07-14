const joi = require('joi')
const { reg_login_schema } = require('./user')
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
const password = reg_login_schema.body.password

exports.update_userinfo_schema = {
  body: {
    username,
    email,
    id
  }
}

exports.reset_pwd_schema = {
  body: {
    oldPassword: password,
    newPassword: joi.not(joi.ref('oldPassword')).concat(password),
    repeatPassword: joi.ref('newPassword'),
    id: reg_login_schema.id
  }
}

exports.update_avatar_schema = {
  body: {
    id: reg_login_schema.id,
    avatar: joi
      .string()
      .dataUri()
      .required()
  }
}
