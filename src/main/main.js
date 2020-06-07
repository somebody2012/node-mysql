const moduleAlias = require('module-alias');
moduleAlias();
let express = require("express");
let app = express();
let {getLogger} = require("@log/index.js");
require("@middleware/root.js").init(app);
let path = require("path");

app.use(express.static(path.resolve(__dirname, 'resources/public')));
let routes = require("@src/main/node/routes/index");
let logger = getLogger();
routes.init(app);



app.listen(8899,(a,b,c) => {
  logger.info("建立监听：8899");
  logger.error("xxxx",Date.now())
})





