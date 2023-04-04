const UserController = require('../controllers/user');
const isAuthenticated = require('../middlewares/auth');

const router = require('express').Router();

router.post('/new' , UserController.createUser);

router.post('/login' , UserController.login);

router.get('/logout' , isAuthenticated , UserController.logout);

module.exports = router;