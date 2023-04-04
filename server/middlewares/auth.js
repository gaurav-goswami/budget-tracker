const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');

const isAuthenticated = async (req, res, next) => {

    const {token} = req.cookies;

    if(!token){

        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          });

        return next(new ErrorHandler("User is not authenticated" , 401))
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded._id);

    next();

}

module.exports = isAuthenticated;