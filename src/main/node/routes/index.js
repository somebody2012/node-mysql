function init(app){
  app.use("/user",require("./user/index"));
}






module.exports.init = init;