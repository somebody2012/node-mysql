let CONSTANT = require("@comm/constant.js");


module.exports =  class Result {
  constructor(params){
    this.isSuccess = params.isSuccess;
    this.errorCode = params.errorCode;
    this.data = params.data;
    this.message = params.message;
  }
  static success(params={}){
    return new Result({
      isSuccess:true,
      errorCode:CONSTANT.SUCCESS_CODE,
      data:params.data||null,
      message:params.message||"成功"
    });
  }
  static fail(params={}){
    return new Result({
      isSuccess:false,
      errorCode:CONSTANT.ERROR_CODE,
      data:params.data||null,
      message:params.message||"失败",
    });
  }
  static create(params){
    return new Result(params);
  }
}
