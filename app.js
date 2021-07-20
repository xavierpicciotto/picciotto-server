const express = require('express')
const path = require('path')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*'/*https://xavier-picciotto.com/*/)
    res.setHeader('Access-Controle-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())