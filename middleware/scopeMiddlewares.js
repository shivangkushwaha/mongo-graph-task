const Joi = require("joi");
const { sendBadResponse } = require("../controllers/responseController");
// const scopeValidator = ( scope = [] ) => {
//   return (req, res, next) => {
//     if( scope == null || scope.length === 0 )
//         return next()
//     let isValid = false;
//     let userPermissions = req.auth.scope;
//     for (const permission of userPermissions) {
//         if( scope.includes(permission) ){
//                 isValid = true
//                 break;
//         }
//     }
//     if ( isValid ) {
//       next();
//     } else {
//       return sendBadResponse(res,"Premission out of scope", 422);
//     }
//   }
// }

const scopeValidator = (scope = []) => {
  return (resolver) => {
      return async (parent, args, context, info) => {
          if (scope == null || scope.length === 0) return resolver(parent, args, context, info);

          let isValid = false;
          let userPermissions = context.scope;  // Assuming context.scope is an array of user permissions

          for (const permission of userPermissions) {
              if (scope.includes(permission)) {
                  isValid = true;
                  break;
              }
          }

          if (isValid) {
              return resolver(parent, args, context, info);
          } else {
              throw new Error('Permission out of scope');
          }
      };
  };
};

module.exports = { scopeValidator };