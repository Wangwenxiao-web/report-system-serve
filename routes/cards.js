var express = require('express');
var router = express.Router();
var cards = require('../controllers/cardsController');

router.get('/getCardsInfo',cards.cardsinfo);

module.exports = router;