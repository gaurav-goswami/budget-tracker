const Transaction = require("../models/transaction");
const ErrorHandler = require('../utils/errorHandler');



class TransactionController{

    // create transaction

    static createTransaction = async (req, res, next) => {
        try {
            const {name , transactionType , amount, category} = req.body;

            if(name && transactionType && amount && category){
                await Transaction.create({name, transactionType, amount, category, user : req.user});
    
                res.status(201).json({
                    message : 'transaction added successfully'
                })
            }
            else{
                return next(new ErrorHandler("Fill all the fields", 422))
            }

        } 
        catch (error) {
            console.log(error.message)
            return next(new ErrorHandler())
        }
    }

    // get all transactions 

    static getAllTransactions = async (req, res, next) => {
        try {
            // const {_id} = req.user;

            // const allTransactions = await Transaction.find({user : _id});

            const allTransactions = await Transaction.find({user: req.user});
            
            res.json({
                allTransactions
            })
        } 
        catch (error) {
            return next(new ErrorHandler())
        }
    }

    // delete transaction

    static deleteTransaction = async (req, res, next) => {
        try {
            const {id} = req.params;

            await Transaction.findByIdAndDelete({_id : id});

            res.json({
                message : 'Transaction Deleted Successfully'
            })

        }
        catch (error) {
            return next(new ErrorHandler())
        }
    }

    // update transaction

    static updateTransaction = async (req, res, next) => {
        try {
            const u_transaction = await Transaction.updateOne({ _id: req.params.id }, { $set: req.body.transactionDetails });
            
            if (u_transaction.nModified === 0) {
                // If no documents were modified, return an error response
                return res.status(404).json({
                    message: 'Transaction not found or no changes made'
                });
            }
            
            res.json({
                message: 'Transaction Updated Successfully',
                u_transaction
            });
        } catch (error) {
            console.error(error);
            return next(new ErrorHandler(error.message, 500));
        }
    }

    // get transaction based on type/category

    static getSelectedTransaction = async(req, res, next) => {

        try {
            const {type , category, time} = req.params;

            console.log(type, category, time);

            let startDate = new Date();

            if(time === 'week'){
                startDate.setDate(startDate.getDate() - 7);
            }
            else if(time === 'half'){
                startDate.setDate(startDate.getDate() - 15);
            }
            else if(time === 'month'){
                startDate.setMonth(startDate.getMonth() - 1);
            }

            let transaction;

            if(category === 'all'){
                transaction = await Transaction.find({ user : req.user , transactionType : type , createdAt: { $gte: startDate }})
            }
            else{
                transaction = await Transaction.find({ user : req.user , transactionType : type , category , createdAt: { $gte: startDate }});
            }
            if(!transaction) return next(new ErrorHandler ('No trasactions found' , 404))

            res.status(200).json({
                transaction
            })
        }
        catch (error) {
            return next(new ErrorHandler())
        }

    }

    static getLatestTransactions = async (req, res, next) => {

        try {

            const {_id} = req.user;
            
            let date = new Date();
            date.setDate(date.getDate()-7);

            // const transaction = await Transaction.find({user : _id} , {createdAt : {$gte : date}})
            // const transaction = await Transaction.find({user : _id.toString()} , {createdAt : {$gte : date}})

            const transaction = await Transaction.find({user : _id, createdAt: {$gte : date}})

            if(transaction){
                res.json({
                    transaction,
                    message : req.user.name
                })
            }

        } 
        catch (error) {
            console.log(error.message)
            next(new ErrorHandler(error.message));
        }
    }

}

module.exports = TransactionController;