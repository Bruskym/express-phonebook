const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const {varGrabber} = require('./src/middlewares/middlewares')


route.get("/", homeController.index)

// rotas de login 

route.get('/login', varGrabber, loginController.index)
route.post('/login/register', loginController.register)

module.exports = route