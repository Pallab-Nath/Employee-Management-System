const express = require('express')
require('dotenv').config()
const ejs = require('ejs')
const path = require('path')

const app = express()
const port = process.env.PORT || 4000
const publicDir = path.join(__dirname,'./public')

app.set('view engine','ejs')

app.use(express.static(publicDir))

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port,()=>{
    console.log('listening on port '+ port)
})

