const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true , 'Enter name'],
        trim : true
    },

    email : {
        type : String,
        required : [true , 'Enter email'],
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },

    password : {
        type : String,
        required : [true , 'Enter password'],
        minlength : 8
    },

    profile : {
        type : String,
        default : ''
    }

})

const User = mongoose.model('User' , userSchema);

module.exports = User;