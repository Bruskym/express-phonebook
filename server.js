require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const helmet = require('helmet')
const csrf = require('csurf')
const path = require('path')
const routes = require('./routes')

const {sessionUserFetcher ,checkError, captureCsrfToken} = require('./src/middlewares/middlewares')

const app = express()

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionConfig = session({
    secret: process.env.SECRETKEY,
    store: MongoStore.create({mongoUrl:process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
})
app.use(sessionConfig)
app.use(flash())
app.use(csrf())

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    app.emit('ready')
})
.catch(
    (error) => {
        console.log(error)
    }
)

//meus  middlewares
app.use(sessionUserFetcher)
app.use(captureCsrfToken)
app.use(checkError)

app.use(routes)

app.on('ready', () => {
    app.listen(3000, () => {
        console.log('Conectado a porta 3000')
        console.log("http://localhost:3000")
    })
})