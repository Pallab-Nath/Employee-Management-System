const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})

const employee = mongoose.model('employee',employeeSchema)

module.exports = employee;