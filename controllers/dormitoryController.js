var dbconfig = require("../config/db.config")
// 获取宿舍信息
let getdormitory = (req,res)=>{
  let pageIndex = req.body.pageIndex-1;
  let pageSize = req.body.pageSize;
    var sql = "select * from dormitory_info limit "+pageIndex*pageSize+","+pageSize;
    var sqlArr = [pageIndex,pageSize];
    var callBack = (err,data)=>{
      if (err) {
        console.log(err);
        console.log("数据库连接失败");
      }else{
        res.send({
          "data": data,
          "total": 30
        })
      }
    }
    dbconfig.sqlConnect(sql,sqlArr,callBack)
}
// 获取交换信息
let getExchangeInfo = (stuNo)=>{
  let sql = "select * from exchange_application where studentNo=?";
  let sqlArr = [stuNo];
  return dbconfig.SySqlConnect(sql,sqlArr);
}
// 提交调换申请
let exchangeDormitory = (req,res)=>{
  let stuNo = req.body.studentNo;
  let stuName = req.body.studentName;
  let Now_No = req.body.Now_No;
  let Wish_No = req.body.Wish_No;
  let reason = req.body.reason;
  let sql = `insert into exchange_application(studentNo,studentName,Now_dormitory_No,Wish_dormitory_No,reason) value(?,?,?,?,?)`;
  let sqlArr = [stuNo,stuName,Now_No,Wish_No,reason];
  var callBack = async (err,data)=>{
    if(err){
      console.log(err);
      console.log("提交失败");
    }else {
      let result = await getExchangeInfo(stuNo)
      res.send({
        "data":result,
        "message":"提交成功！"
      })
    }
  }
  dbconfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
  getdormitory,
  exchangeDormitory,
}