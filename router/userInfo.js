const express= require('express')
const userInfoHandler=require('../router-handler/userInfo')
const expressjoi=require('@escook/express-joi')
 const {update_userinfo_schema}= require('../schema/userInfo')
const router = express.Router()


router.get('/userInfo',userInfoHandler.getUserInfo)
router.post('/userInfo',expressjoi(update_userinfo_schema),userInfoHandler.updateUserInfo)
module.exports=router