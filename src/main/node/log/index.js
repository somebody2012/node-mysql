let { configure, getLogger,connectLogger } = require("log4js");
let globalConfig = require("@src/main/resources/globalConfig.json");
configure({
  appenders: { 
    // out: { type: 'stdout' },
    out: { type: 'console' },
    default: { 
      type: "file", 
      maxLogSize: 8*1024*10,
      filename: "out/log/default.log", 
      backups: 5,
      compress: true,
      pattern: 'yyyyMMdd', 
      encoding: 'utf-8',
      layout: {
        type: "pattern",
        pattern: `[%d][%p][%h] %m`
    },
      keepFileExt: true ,
      alwaysIncludePattern: true
    },
  },
  categories: {
    default: { appenders: ['out','default'], level: 'debug' }, 
  }
});



module.exports = {
  getLogger
};


