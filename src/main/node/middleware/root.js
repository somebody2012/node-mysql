let bodyParser = require("body-parser");
let multipart = require("connect-multiparty");






module.exports = {
  init(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(multipart());
    app.use(function(req,res,next){
      next();
    })
  }
}