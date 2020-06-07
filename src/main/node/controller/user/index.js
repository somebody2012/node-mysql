let db = require("@db/user/index");
let Result = require("@comm/Result");


module.exports = {
  async getAllUser(){
    let res = await db.getAllUser();
    if(res.isSuccess){
      return Result.success({data:res.data});
    }else{
      return Result.fail()
    }
  }
}