const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const PokemonController = require('../controllers/PokemonController');

router.get('/', PokemonController.getAll);

router.use(auth);
router.get('/list', PokemonController.getListByUser);
router.get('/:id', PokemonController.getById);

module.exports = router;