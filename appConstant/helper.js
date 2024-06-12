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
    const {user, scope, userRoles} = await userService.findUser(id);
    if (scope.includes("admin")) {
      hasFullAccess = 1;
    }
    let token = signToken(JSON.stringify({ user, scope, roles : userRoles}));
   
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

