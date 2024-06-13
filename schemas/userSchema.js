const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const userResolver = require('../resolvers/userResolver');
const scopeValidator = require('../middleware/scopeMiddlewares');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        role: { type: GraphQLString },
        organizationId: { type: GraphQLID }
    })
});

const LoginType = new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
        userId: { type: GraphQLID },
        token: { type: GraphQLString },
        tokenExpiration: { type: GraphQLString }
    })
});

const userQueries = {
    user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve: scopeValidator(['read:user'])(async (parent, args, context) => {
            return userResolver.getUser(args.id);
        })
    },
    users: {
        type: new GraphQLList(UserType),
        resolve: scopeValidator(['read:users'])(async (parent, args, context) => {
            return userResolver.getAllUsers();
        })
    }
};

const userMutations = {
    addUser: {
        type: UserType,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString },
            roleId: { type: GraphQLID },
            organizationId: { type: GraphQLID }
        },
        resolve: scopeValidator(['create:user'])(async (parent, args, context) => {
            return userResolver.createUser(args.username, args.password, args.roleId, args.organizationId);
        })
    },
    deleteUser: {
        type: UserType,
        args: {
            id: { type: GraphQLID }
        },
        resolve: scopeValidator(['delete:user'])(async (parent, args, context) => {
            return userResolver.deleteUser(args.id);
        })
    },
    updateUser: {
        type: UserType,
        args: {
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            roleId: { type: GraphQLID }
        },
        resolve: scopeValidator(['update:user'])(async (parent, args, context) => {
            return userResolver.updateUser(args.id, args.username, args.roleId);
        })
    },
    login: {
        type: LoginType,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve: async (parent, args, context) => {
            return userResolver.loginUser(args.username, args.password);
        }
    }
};

module.exports = {
    UserType,
    userQueries,
    userMutations
};
