const mysql = require('mysql');
module.exports = {
    // 数据库配置
    config: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'report_system'
    },
    // 连接数据库，使用MySQL的连接池连接方式. 好处就是当数据量很大的时候可以减少我们的连接时间
    // 连接池对象
    sqlConnect: function (sql, sqlArr, callBack) {
        var pool = mysql.createPool(this.config);
        pool.getConnection((err, conn) => {
            if (err) {
                console.log("数据库连接失败");
                return false;
            } else {
                console.log("数据库连接成功");
            }
            // 时间驱动回调
            conn.query(sql, sqlArr, callBack);
            // 释放连接
            conn.release();
        })
    },
    // promise 回调
    SySqlConnect:function(sySql,sqlArr){
        return new Promise((resolve,reject)=>{
            var pool = mysql.createPool(this.config);
            pool.getConnection((err,conn)=>{
                if(err){
                    reject(err);
                }else{
                    conn.query(sySql,sqlArr,(err,data)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve(data);
                        }
                    });
                    // 释放连接
                    conn.release();                  
                }
                
            })
        }).catch((err)=>{
                console.log(err);
            })
    }
}