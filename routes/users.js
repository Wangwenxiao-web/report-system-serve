var express = require('express');
var router = express.Router();
var user = require('../controllers/userinfoController')

/* GET users listing. */
router.post('/login', user.login);
router.post('/getCheckInfo', user.getCheckInfo);
router.post('/checked', user.checked);
router.post('/upcheck', user.upcheck)
router.post('/changepass', user.setPassword);
router.post('/getUserinfo', user.getUsersinfo);
router.post('/getAcademicInfo', user.getAcademicInfo);
router.post('/getFamily', user.getFamily);
router.post('/deleteFamily', user.deleteFamily);
router.post('/insertFamily', user.insertFamily);
router.post('/updateFamily', user.updateFamily);
router.post('/getScoreInfo', user.getScoreInfo);
router.post('/getTeacherInfo', user.getTeacherInfo)

module.exports = router;
