require("dotenv").config();
const Cryptr = require("cryptr");
const {SECRET_KEY} = require("./constant")
const cryptr = new Cryptr(SECRET_KEY);
const Jwt = require("jsonwebtoken");
const userService = require("../service/userService");
const privateKey = SECRET_KEY;



module.exports = {
  // Decrypt Data
  decryptData:async(text)=>{
    return cryptr.decrypt(text)
  },

  encryptData:async(text)=>{
    let data=await cryptr.encrypt(text)
    return data
  },

  // Generate JWT Tokens
  generateAccessToken: async (id) => {
    let hasFullAccess = 0;
    let scope = [];
    // let user = await Models.User.findOne({
    //   where: { id },
    //   attributes: ["uuid","id","email","countryCode","email","phone"],
    //   include: [
    //     {
    //       model: Models.UserProfile,
    //       attributes: ["name", "dob", "isCompleted","image"],
    //       as: "profile",
    //       include: [
    //         {
    //           model: Models.Attachment,
    //           attributes: attachmentAttribute
    //         }
    //       ]
    //     },
    //   ],
    // });    
    // let roles = await user.getRoles();
    // for (const role of roles) {
    //   scope.push(role.dataValues.code);
    //   let permissions = await role.getPermissions({ raw: true, nest: true });
    //   for (const permission of permissions) {
    //     scope.push(permission.code);
    //   }
    // }
    // if (scope.includes("admin")) {
    //   hasFullAccess = 1;
    // }
    // // console.log('user', user)
    let user = await userService.findUser(id);
    console.log('suer',user)
    let token = signToken(JSON.stringify({ id:id ,scope: scope}));
    user = JSON.parse(JSON.stringify(user));
   
    return {
      hasFullAccess,
      user,
      scope,
      token,
    };
  },

  // Validate Token
  validateToken: async (token) => {
    try {
      let data = JSON.parse(Jwt.verify(token, privateKey).data);
      data=JSON.parse(data)
      return data;
    } catch (error) {
      return false;
    }
  },

   getOffset:(page,limit)=>{
    return ((page - 1) * limit)
  },

   totalPages:(count,limit)=>{
  return (Math.ceil(count / limit))
  }

};

// Signing Information With Private Key
const signToken = (data) => {
  return Jwt.sign( {data: JSON.stringify(data) }, privateKey);
};

