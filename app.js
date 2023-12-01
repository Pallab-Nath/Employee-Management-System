const express = require('express')
require('dotenv').config()
const ejs = require('ejs')
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const port = 3000 
const publicDir = path.join(__dirname,'./public')
const employee = require('./models/employee')
const check = require('./middleware')

mongoose.connect(process.env.DB_URL)
.then(()=>console.log('Connected to Database'))
.catch((e)=>console.log('Connection to DB is failed'))

app.set('view engine','ejs')

app.use(cookieParser())

app.use(express.static(publicDir))
app.use(express.urlencoded({extended:true}))


app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{
    if(req.body.email==process.env.EMAIL && req.body.password==process.env.PASS)
    {
        const token = jwt.sign({ email: req.body.email}, process.env.JWT_SECRET)
        return res.cookie("access_token", token, {httpOnly: true}).redirect('/')
    }
    res.redirect('/login')
})

app.get('/logout',(req,res)=>{
    return res.clearCookie("access_token").redirect('/login')
})

app.get('/',check,async(req,res)=>{
    let users = {}
    users = await employee.find()

    res.render('index',{
        users:users
    })
})

app.get('/add_employee',check,(req,res)=>{
    res.render('addemployee')
})

app.post('/add_employee',check,async(req,res)=>{
    const data = {
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        role:req.body.role
    }
    await employee.create(data)
    res.redirect('/')
})

app.get('/update-user',check,async(req,res)=>{
    const id = req.query.id
    const userdata = await employee.findById(id)
    console.log(userdata)
    res.render('update-user', {user:userdata})
})

app.post('/update-user',check,async(req,res)=>{
    const id = req.query.id
    await employee.findByIdAndUpdate(id,req.body)
    res.redirect('/')
})

app.delete('/api/users/:id',check,(req,res)=>{
    const id = req.params.id;
    employee.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
})


app.listen(port,()=>{
    console.log('listening on port '+ port)
})

