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
//检查用户密码
let checkUserPwd = async (stuNo)=>{
    let sql = `select password from cardsinfo where studentNo=?`;
    let sqlArr = [stuNo];
    let result = await dbconfig.SySqlConnect(sql,sqlArr);
    if(result.length){
        return result[0].password;
    }else{
        return 0;
    }
}
// 更改餐卡信息
let setPassword = async (req,res)=>{
    let stuNo = req.body.stuNo;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    // let {user_id,oldpassword,newpassword}=req.body;
    let userPwd = await checkUserPwd(stuNo);    
    if(userPwd){
        console.log(userPwd,oldPassword)
        if(userPwd == oldPassword){
            let sql = `update cardsinfo set password=? where studentNo=?`;
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

module.exports = {
    cardsinfo,
    setPassword
}