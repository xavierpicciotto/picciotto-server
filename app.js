const express = require('express')
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*'/*https://xavier-picciotto.com/*/)
    res.setHeader('Access-Controle-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

const db = require('./models/index')

db.sequelize.sync()

app.get('/',(req,res)=> {
  res.status(200).send({message:'server piccciotto-xm en service'})
})

//CRUD USER
require('./routes/user.routes')(app)

module.exports = app
