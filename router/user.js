
const router = require("express").Router();
require("dotenv").config();
const appContant = require("../appConstant/constant");
const { loginUser } = require("../controllers/userController");
const { validator, queryValidator } = require("../middleware/validator.middlewares");
const { scopeValidator } = require("../middleware/scopeMiddlewares");
const { authentication } = require("../middleware/authMiddleware");
const schema = require("../apiSchema/user");

router.post("/login" , validator( schema.loginSchema ), loginUser);
// router.get("/address" , authentication, scopeValidator( [ appContant.ROLES.ADMIN, appContant.ROLES.USER ] ), queryValidator( schema.listSchema ), get);
// router.delete("/address" ,  authentication, scopeValidator( [ appContant.ROLES.ADMIN, appContant.ROLES.USER ] ), queryValidator( schema.deleteSchema ), deleteById);

module.exports = router;
