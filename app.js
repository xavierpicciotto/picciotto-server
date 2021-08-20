const express = require('express')
const exphbs = require('express-handlebars')
const { hostname } = require('os')
const path = require('path')
const db = require('./models/index')

const app = express()
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

//View engine setup
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

db.sequelize.sync()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*' /*https://xavier-picciotto.com/*/ )
  res.setHeader('Access-Controle-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, x-access-token')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

//CRUD USER
require('./routes/user.routes')(app)
//EMAIL REGISTER ET VALIDATION
require('./routes/email.routes')(app)

app.get('/', (req, res) => {
  res.render('homeServer')
})
module.exports = app