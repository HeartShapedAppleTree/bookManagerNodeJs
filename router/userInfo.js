const express = require('express')
const userInfoHandler = require('../router-handler/userInfo')
const expressjoi = require('@escook/express-joi')
const {
  update_userinfo_schema,
  reset_pwd_schema,
  update_avatar_schema
} = require('../schema/userInfo')
const router = express.Router()

router.get('/userInfo', userInfoHandler.getUserInfo)
router.post(
  '/userInfo',
  expressjoi(update_userinfo_schema),
  userInfoHandler.updateUserInfo
)
router.post('/resetpwd', expressjoi(reset_pwd_schema), userInfoHandler.resetPwd)
router.post(
  '/update/avatar',
  [express.urlencoded({ limit: '5mb' }), expressjoi(update_avatar_schema)],
  userInfoHandler.updateAvatar
)
module.exports = router
