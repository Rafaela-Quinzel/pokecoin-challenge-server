const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const TransactionsController = require('../controllers/TransactionsController');

router.use(auth);
router.get('/', TransactionsController.getTansations);
router.get('/ticker', TransactionsController.getHistoryTicker);
router.get('/trades', TransactionsController.getHistoryTicker);
router.post('/purchase', TransactionsController.createPurchase);
router.post('/sell', TransactionsController.createSell);

module.exports = router;