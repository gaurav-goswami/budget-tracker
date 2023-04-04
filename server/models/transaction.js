const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true , 'Enter transaction name'],
        trim : true
    },

    transactionType : {
        type : String,
        trim : true,
        required : [true , 'Enter transaction type'],
        lowercase : true
    },

    amount : {
        type : Number,
        required : [true , 'Enter transaction amount'],
    },

    category : {
        type : String,
        required : [true , 'Enter transaction category'],
        lowercase : true
    }, 

    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },

    createdAt : {
        type : Date,
        default : new Date
    }

})

const Transaction = mongoose.model('transaction' , transactionSchema);

module.exports = Transaction;