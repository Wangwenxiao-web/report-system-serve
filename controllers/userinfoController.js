var dbconfig = require("../config/db.config");
// 获取所有账户信息
let getusersinfo = (req,res) => {
  var sql = "select * from useraccounts";
  var sqlArr = [];
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
// // 获取指定用户信息
// getuserinfo = (req,res) => {
//   let id = req.query;
//   var sql = "select * from userinfo where userID=?";
//   var sqlArr = [id];
//   var callBack = (err, data) => {
//     if (err) {
//       console.log("数据库连接失败");
//     } else {
//       res.send({
//         "data": data
//       })
//     }
//   }
//   dbconfig.sqlConnect(sql, sqlArr, callBack);
// }
// 获取指定账户信息
let getUserInfo = (userID)=>{
  let sql = "select * from useraccounts where userID=?";
  let sqlArr = [userID];
  return dbconfig.SySqlConnect(sql,sqlArr);
}
// 用户登录
let login = (req,res)=>{
  console.log(req.body);
  let userName = req.body.userName;
  let password = req.body.password;
  let sql = "select * from useraccounts where studentName=? and password=?";
  let sqlArr = [userName,password];
  let callBack = async (err,data)=>{
    if(err){
      console.log(err);
      res.send({
        code: 400,
        msg: '出错了'
      });
    }else if(data==""){
      res.send({
        code: 400,
        msg: '用户名或密码错误'
      });
    }else {
      // let userID = data[0].userID;
      // let result = await getUserInfo(userID);
      // data[0].userinfo = result[0];
      res.send({
        code: 200,
        msg: '登录成功,欢迎来到青岛理工大学！',
        data: "dashboard",
      });
    }
  } 
  dbconfig.sqlConnect(sql,sqlArr,callBack)
  // 获取用户信息

  // 提交个人材料

}


module.exports = {
  getusersinfo,login
}