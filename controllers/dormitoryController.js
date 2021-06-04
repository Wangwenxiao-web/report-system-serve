var dbconfig = require("../config/db.config")
// 获取宿舍信息长度
let getdormitoryLength = async (classinfo)=>{
  var sql = 'select * from dormitory_info where className=?';
  var sqlArr = [classinfo];
  var result = await dbconfig.SySqlConnect(sql,sqlArr);
  if(result.length){
    return result.length;
  }else {
    return 0;
  }
}
// 获取宿舍信息
let getdormitory = async (req,res)=>{
  let pageIndex = req.body.pageIndex-1;
  let pageSize = req.body.pageSize;
  let classinfo = req.body.classinfo;
  let total = await getdormitoryLength(classinfo);
  var sql = "select * from dormitory_info where className=? limit "+pageIndex*pageSize+","+pageSize;
  var sqlArr = [classinfo];
  var callBack = (err,data)=>{
    if (err) {
      console.log(err);
      console.log("数据库连接失败");
    }else{
      res.send({
        "data": data,
        "total": total
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
  var sql = `insert into exchange_application(studentNo,studentName,Now_dormitory_No,Wish_dormitory_No,reason) value(?,?,?,?,?)`;
  var sqlArr = [stuNo,stuName,Now_No,Wish_No,reason];
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