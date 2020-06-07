let mysql = require('mysql');
let Result = require("@comm/Result");
let globalConfig = require("@src/main/resources/globalConfig.json");
let uuid = require("uuid");

let pool  = null;

let getConnection = function(){
  return new Promise((resolve,reject) => {
    try{
      let connection = mysql.createConnection({
        host     : globalConfig.host,
        user     : globalConfig.user,
        password : globalConfig.password,
        database : globalConfig.database
      });
      connection.connect(function(err){
        if(err){
          resolve(Result.fail({message:err.stack}));
        }else{
          resolve(Result.success({data:connection,message:"连接成功"}));
        }
      });
    }catch(e){
      resolve(Result.fail({message:e.message}));
    }
  });
  
}

let getConnectionPool = function(){
  if(!pool){
    pool = mysql.createPool({
      connectionLimit : globalConfig.connectionLimit,
      host            : globalConfig.host,
      user            : globalConfig.user,
      password        : globalConfig.password,
      database        : globalConfig.database
    });
  }
  return Result.success({data:pool});
}



function query(sqlStr,values=[]){
  return new Promise(async (resolve,reject) => {
    if(!sqlStr){
      resolve(Result.fail({message:"参数错误"}));
      return;
    }
    let res = await getConnection();
    if(res.isSuccess){
      let connection = res.data;
      connection.query.call(connection,sqlStr,values,function(error,results,fields){
        if(error){
          connection.end();
          resolve(Result.fail({message:error.message}));
        }else{
          connection.end();
          resolve(Result.success({
            data:{results,fields},
            message:"成功"
          }));
        }
      });
    }else{
      resolve(Result.create(res));
    }
  });
}
function queryOfPool(sqlStr,values=[]){
  return new Promise(async (resolve,reject) => {
    if(!sqlStr){
      resolve(Result.fail({message:"参数错误"}));
      return;
    }
    let res = await getConnectionPool();
    if(res.isSuccess){
      let pool = res.data;
      pool.getConnection((err,connection) => {
        if(err){
          resolve(Result.fail({message:err.message})); 
        }else{
          connection.query.call(connection,sqlStr,values,function(error,results,fields){
            if(error){
              connection.release();
              resolve(Result.fail({message:error.message}));
            }else{
              connection.release();
              resolve(Result.success({
                data:results,
                message:"成功"
              }));
            }
          });
        }
      });
    }else{
      resolve(Result.create(res));
    }
  });
}

function insert(sqlStr,values=[]){
  return new Promise(async (resolve,reject) => {
    if(!sqlStr){
      resolve(Result.fail({message:"参数错误"}));
      return;
    }
    let res = await getConnectionPool();
    if(res.isSuccess){
      let connection = res.data;
      if(typeof sqlStr == "string"){
        sqlStr = sqlStr
        .replace(/\((\s*[a-zA-Z0-9_]+,)/,"(ID,$1")
        .replace(/(\?\s*\))/,"?,$1");
      }else{
        sqlStr.sql = sqlStr.sql
        .replace(/\((\s*[a-zA-Z0-9_]+,)/,"(ID,$1")
        .replace(/(\?\s*\))/,"?,$1");
      }
      let ID = uuid.v1();
      values.unshift(ID);
      connection.query.call(connection,sqlStr,values,function(error,results,fields){
        if(error){
          connection.release();
          resolve(Result.fail({message:error.message}));
        }else{
          connection.release();
          resolve(Result.success({
            data:{results,fields},
            message:"成功"
          }));
        }
      });
    }else{
      resolve(Result.create(res));
    }
  });
}












module.exports.getConnection = getConnection;
module.exports.query = queryOfPool;
module.exports.insert = insert;