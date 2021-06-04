var express = require('express');
var router = express.Router();
var dormitory = require('../controllers/dormitoryController')
/* GET home page. */
router.post('/GetDormitory', dormitory.getdormitory);
router.post('/exchangeDormitory', dormitory.exchangeDormitory);

module.exports = router;
