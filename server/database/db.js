const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.DB_URI}/budgettracker`);
        if(connect) console.log('Successfully connected to database');
    } 
    catch (error) {
        console.log('Something went wrong while connecting to database')
    }
}

module.exports = connectDB;