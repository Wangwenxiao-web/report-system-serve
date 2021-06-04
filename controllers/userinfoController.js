var dbconfig = require("../config/db.config");
// 获取指定账户信息
let getUserInfo = async (userID) => {
  let sql = "select * from useraccounts where studentNo=?";
  let sqlArr = [userID];
  let result = await dbconfig.SySqlConnect(sql, sqlArr);
  if(result.length){
    return result[0].className
  }else {
    return 0;
  } 
}
// 用户登录
let login = async (req, res) => {
  console.log(req.body);
  let stuNo = req.body.stuNo;
  let password = req.body.password;
  let userClass = await getUserInfo(stuNo);
  let sql = "select * from useraccounts where studentNo=? and password=?";
  let sqlArr = [stuNo, password];
  let callBack = (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        code: 400,
        msg: '出错了'
      });
    } else if (data == "") {
      res.send({
        code: 400,
        msg: '用户名或密码错误'
      });
    } else {
      res.send({
        "code": 200,
        "msg": '登录成功,欢迎来到青岛理工大学！',
        "data": "dashboard",
        "info": userClass
      });
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callBack)
}
// 获取用户信息
let getUsersinfo = (req, res) => {
  let stuNo = req.body.stuNo;
  var sql = "select * from userinfo where studentNo=?";
  var sqlArr = [stuNo];
  var callBack = (err, data) => {
    if (err) {
      console.log("数据库连接失败");
    } else {
      res.send({
        "data": data
      })
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callBack)
}
// 检查用户密码
let checkUserPwd = async (stuNo)=>{
  let sql = `select password from useraccounts where studentNo=?`;
  let sqlArr = [stuNo];
  let result = await dbconfig.SySqlConnect(sql,sqlArr);
  if(result.length){
      return result[0].password;
  }else{
      return 0;
  }
}
// 更改用户密码
let setPassword = async (req,res)=>{
  let stuNo = req.body.stuNo;
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  let userPwd = await checkUserPwd(stuNo);    
  if(userPwd){
      console.log(userPwd,oldPassword)
      if(userPwd == oldPassword){
          let sql = `update useraccounts set password=? where studentNo=?`;
          let sqlArr = [newPassword,stuNo];
          let result = await dbconfig.SySqlConnect(sql,sqlArr);
          if(result.affectedRows){
              console.log(result);
              res.send({
                  code:200,
                  msg:'修改密码成功！'
              })
          }else{
              res.send({
                  code:400,
                  msg:'修改密码失败！'
              })
          }
      }else{
          res.send({
              code:400,
              msg:'原密码输入错误！'
          })
      }
  }else{
      res.send({
          'error': "学号不存在，请联系管理员"
      })
  }    
}

// 获取家庭成员信息
let getFamily = (req, res) => {
  let stuNo = req.body.stuNo; 
  var sql = "select * from familyinfo where studentNo=? or ID=?";
  var sqlArr = [stuNo,stuNo];
  var callBack = (err, data) => {
    if (err) {
      console.log("数据库连接失败");
    } else {
      console.log(req.body);
      res.send({
        "data": data
      })
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callBack)
}
// 删除成员信息
let deleteFamily = (req,res) => {
  let ID = req.body.ID;
  var sql = `delete from familyinfo where ID=?`;
  var sqlArr = [ID];
  var callBack = (err,data)=>{
    if(err){
      console.log("删除失败");
    }else {
      res.send({
        "msg": "删除成功！"
      })
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callBack)
}
// 添加成员信息
let insertFamily = (req,res) => {
  let stuNo = req.body.stuNo;
  let familyName = req.body.name;
  let relationships = req.body.relationships;
  let political = req.body.political;
  let work = req.body.work;
  let contract = req.body.contract;
  var sql = `insert into familyinfo(studentNo,familyName,relationships,political,work,contract) value(?,?,?,?,?,?)`;
  var sqlArr = [stuNo,familyName,relationships,political,work,contract];
  var callBack = (err,data)=>{
    if(err){
      console.log(err);
      res.send({
        'msg':"添加失败，请联系管理员"
      })
    }else {
      res.send({
        'msg': "添加成功！"
      })
    }
  }
  dbconfig.sqlConnect(sql,sqlArr,callBack);
}
// 更新成员信息
let updateFamily = (req,res)=>{
  let ID = req.body.ID;
  let familyName = req.body.name;
  let relationships = req.body.relationships;
  let political = req.body.political;
  let work = req.body.work;
  let contract = req.body.contract;
  var sql = `update familyinfo set familyName=?,relationships=?,political=?,work=?,contract=? where ID=?`;
  var sqlArr = [familyName,relationships,political,work,contract,ID];
  var callBack = (err,data)=>{
    if(err){
      console.log(err);
      res.send({
        'msg':"编辑失败，请联系管理员"
      })
    }else {
      res.send({
        'msg': "编辑成功！"
      })
    }
  }
  dbconfig.sqlConnect(sql,sqlArr,callBack);
}
// 获取确认信息
let getCheckInfo = (req,res)=>{
  let stuNo = req.body.stuNo;
  var sql = 'select * from checkinfo where studentNo=?';
  var sqlArr = [stuNo];
  var callBack = (err,data)=>{
    if(err){
      console.log(err);
      console.log("数据库连接失败");
    }else {
      res.send({
        "data": data,
        "code": 200
      })
    }
  }
  dbconfig.sqlConnect(sql,sqlArr,callBack);
}
// 确认个人材料
let checked = (req,res)=>{
  let checkDate = req.body.checkDate;
  let stuNo = req.body.stuNo;
  var sql = `update checkinfo set checkDate=? where studentNo=?`
  var sqlArr = [checkDate,stuNo];
  var callBack = (err,data)=>{
    if(err){
      console.log(err);
      console.log("数据库连接失败");
    }else {
      res.send({
        "data": "确认成功！",
        "code": 200
      })
    }
  }
  dbconfig.sqlConnect(sql,sqlArr,callBack);
}
// 更新状态
let upcheck = (req,res)=>{
  let stuNo = req.body.stuNo;
  var sql = `update userinfo set checked=1 where studentNo=?`
  var sqlArr = [stuNo];
  var callBack = (err,data)=>{
    if(err){
      console.log(err);
      console.log("数据库连接失败");
    }else {
      res.send({
        "data": "确认成功！",
        "code": 200
      })
    }
  }
  dbconfig.sqlConnect(sql,sqlArr,callBack);
}
// 获取学籍信息
let getAcademicInfo = (req,res)=>{
  let stuNo = req.body.stuNo;
  var sql = 'select * from academicinfo where studentNo=?';
  var sqlArr = [stuNo];
  var callBack = (err,data)=>{
    if(err){
      console.log(err);
      console.log("数据库连接失败");
    }else {
      res.send({
        "data": data,
        "code": 200
      })
    }
  }
  dbconfig.sqlConnect(sql,sqlArr,callBack);
}
// 获取成绩信息
let getScoreInfo = (req,res)=>{
  let stuNo = req.body.stuNo;
  var sql = 'select * from gradesinfo where studentNo=?';
  var sqlArr = [stuNo];
  var callBack = (err,data)=>{
    if(err){
      console.log(err);
      console.log("数据库连接失败");
    }else {
      res.send({
        "code":200,
        "success": true,
        "data": data
      })
    }
  }
  dbconfig.sqlConnect(sql,sqlArr,callBack);
}
// 获取导师信息
let getTeacherInfo = (req,res)=>{
  let stuNo = req.body.stuNo;
  var sql = 'select * from teachersinfo where studentNo=?';
  var sqlArr = [stuNo];
  var callBack = (err,data)=>{
    if(err){
      console.log(err);
      console.log("数据库连接失败");
    }else {
      res.send({
        "code":200,
        "success": true,
        "data": data
      })
    }
  }
  dbconfig.sqlConnect(sql,sqlArr,callBack);
}

module.exports = {
  getUsersinfo,
  login,
  getFamily,
  deleteFamily,
  insertFamily,
  updateFamily,
  setPassword,
  getAcademicInfo,
  getScoreInfo,
  getTeacherInfo,
  getCheckInfo,
  checked,
  upcheck
}