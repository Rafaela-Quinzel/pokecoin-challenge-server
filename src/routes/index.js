const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const pokemonRouter = require('./pokemon');
const transactionsRouter = require('./transactions');
const IndexController = require('../controllers/IndexController');

router.get('/', IndexController.get);
router.use('/user', userRouter);
router.use('/pokemon', pokemonRouter);
router.use('/transactions', transactionsRouter);


module.exports = router;