const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');


class UserController {

    // create user

    static createUser = async (req, res, next) => {

        try {
            const {name , email, password} = req.body;   
            
            if(name && email && password) {

                // console.log(name, email, password);

                const user = await User.findOne({email});

                if(!user){

                    const genSalt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password , genSalt);
                    await User.create({name , email , password : hashedPassword})

                    return res.status(201).json({
                        success : true,
                        message : 'User created successfully'
                    })

                }
                else{
                    return next(new ErrorHandler("User already exists" , 409))
                }

            }
            else{
                return next(new ErrorHandler("Fill all the fields", 422))
            }
        } 
        catch (error) {
            return next(new ErrorHandler(error.message))
        }

    }

    // login

    static login = async (req, res, next) => {
        try {

            const {email , password} = req.body;
            const isUser = await User.findOne({email});

            if(isUser && await bcrypt.compare(password , isUser.password)){

                const token = jwt.sign({_id : isUser._id} , process.env.JWT_SECRET_KEY);

                // set jwt token in cookie

                res.cookie('token' , token , {
                    httpOnly : true,
                    maxAge : 5*24*60*60*1000,
                    sameSite : 'none',
                    secure : true
                })

                res.cookie('userLoggedIn' , true , {
                    maxAge : 5*24*60*60*1000,
                    sameSite : 'none',
                    secure : true
                })
                
                res.status(200).json({
                    message : 'login successfull'
                })

            }
            else{
                return next(new ErrorHandler('Invalid Credentials' , 401))
            }

        } 
        catch (error) {
            return next(new ErrorHandler(error.message))
        }
    }

    // logout
    
    static logout = async (req, res, next) => {
        try {

          res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          });

          res.clearCookie('userLoggedIn' , {
            sameSite : 'none',
            secure : true
          })

          res.json({
            message: 'Logged out successfully',
          });
        } 
        catch (error) {
          next(new ErrorHandler(error.message));
        }
      }

}

module.exports = UserController;