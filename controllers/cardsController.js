var dbconfig = require("../config/db.config");
// 获取餐卡信息
let cardsinfo = (req,res) => {
    var sql = "select * from cardsinfo"
    var sqlArr = [];
    var callBack = (err, data)=>{
        if(err){
            console.log("数据库连接失败");
        }else {
            res.send({
                "data":data
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}
// 更改餐卡信息

module.exports = {
    cardsinfo
}