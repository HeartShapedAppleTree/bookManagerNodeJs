const express = require('express')
const router = express.Router()
const userHandler = require('./../router-handler/user.js')
const { reg_login_schema } = require('../schema/user')
const expressJoi = require('@escook/express-joi')
router.post('/reguser', expressJoi(reg_login_schema), userHandler.reguser)
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
module.exports = router
