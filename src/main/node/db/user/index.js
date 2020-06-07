let db = require("../index");
let sqls = require("./sql");

module.exports = {
  async getAllUser(){
    let res = await db.query(sqls.getAllUser);
    return res;
  }
}