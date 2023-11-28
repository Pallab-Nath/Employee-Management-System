const express = require('express')
require('dotenv').config()
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 4000
const publicDir = path.join(__dirname,'./public')
const employee = require('./models/employee')

mongoose.connect(process.env.DB_URL)
.then(()=>console.log('Connected to Database'))
.catch((e)=>console.log('Connection to DB is failed'))

app.set('view engine','ejs')

app.use(express.static(publicDir))

app.get('/',async(req,res)=>{
    let users = {}
    users = await employee.find()

    res.render('index',{
        users:users
    })
})

app.get('/add_employee',(req,res)=>{
    res.render('addemployee')
})

app.listen(port,()=>{
    console.log('listening on port '+ port)
})

