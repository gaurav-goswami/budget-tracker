const TransactionController = require('../controllers/transaction');
const isAuthenticated = require('../middlewares/auth');

const router = require('express').Router();

router.post('/new-transaction' , isAuthenticated , TransactionController.createTransaction);

router.get('/all' , isAuthenticated , TransactionController.getAllTransactions);

router.delete('/:id' , isAuthenticated , TransactionController.deleteTransaction);

router.put('/update/:id', isAuthenticated , TransactionController.updateTransaction);

router.get('/:type/:category/:time' , isAuthenticated , TransactionController.getSelectedTransaction);

router.get('/latest-transactions' , isAuthenticated , TransactionController.getLatestTransactions)

module.exports = router;