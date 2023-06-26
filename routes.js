const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const {varGrabber} = require('./src/middlewares/middlewares')


route.get("/", varGrabber, homeController.index)

// rotas de login   

route.get('/login', varGrabber, loginController.index)
route.post('/login/login', loginController.login)
route.post('/login/register', loginController.register)
route.get('/login/logout', loginController.logout)

module.exports = route