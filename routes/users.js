var express = require('express');
var router = express.Router();
var user = require('../controllers/userinfoController')

/* GET users listing. */
router.get('/accounts', user.getusersinfo);
router.post('/login', user.login);

module.exports = router;
