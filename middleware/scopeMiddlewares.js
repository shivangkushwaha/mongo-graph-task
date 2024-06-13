const scopeValidator = (scope = []) => {
  return (resolver) => {
      return async (parent, args, context, info) => {
          let scope = context.scope
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

module.exports = scopeValidator;
