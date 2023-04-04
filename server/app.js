const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error');

// routes import 

const userRouter = require('./routes/user');
const transactionRouter = require('./routes/transaction');

// app

const app = express();

// dotenv 

dotenv.config({
    path : './config/config.env'
})

// Set up CORS headers

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// using middlewares

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());


// using routes

app.use('/api/v1/user' , userRouter);
app.use('/api/v1/transaction' , transactionRouter);

// error middleware

app.use(errorMiddleware);


// app export 

module.exports = app;