let express = require("express");
let router = express.Router();
let userController = require("@controller/user/index");
let Result = require("@comm/Result");

router.get("/getAllUser",async (req,res)=>{
  let allUserRes = await userController.getAllUser();
  res.json(Result.create(allUserRes));
})
router.post("/getAllUser",async (req,res)=>{
  let allUserRes = await userController.getAllUser();
  res.json(Result.create(allUserRes));
})


module.exports = router;



