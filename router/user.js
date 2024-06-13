
const router = require("express").Router();
require("dotenv").config();
const appContant = require("../appConstant/constant");
const { loginUser } = require("../controllers/userController");
const { validator, queryValidator } = require("../middleware/validator.middlewares");
const { scopeValidator } = require("../middleware/scopeMiddlewares");
const { authentication } = require("../middleware/authMiddleware");
const schema = require("../apiSchema/user");

router.post("/login" , validator( schema.loginSchema ), loginUser);
module.exports = router;
