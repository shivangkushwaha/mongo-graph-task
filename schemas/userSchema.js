const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const User = require('../models/user');
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        role: { type: GraphQLString },
        organizationId: { type: GraphQLID }
    })
});

const userQueries = {
    user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return User.findById(args.id);
        }
    },
    users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
            return User.find({});
        }
    }
};

const userMutations = {
    addUser: {
        type: UserType,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString },
            role: { type: GraphQLString },
            organizationId: { type: GraphQLID }
        },
        resolve(parent, args) {
            let user = new User({
                username: args.username,
                password: args.password,
                role: args.role,
                organizationId: args.organizationId
            });
            return user.save();
        }
    },
    deleteUser: {
        type: UserType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return User.findByIdAndRemove(args.id);
        }
    },
    updateUser: {
        type: UserType,
        args: {
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            role: { type: GraphQLString }
        },
        resolve(parent, args) {
            return User.findByIdAndUpdate(
                args.id,
                { username: args.username, role: args.role },
                { new: true }
            );
        }
    }
};

module.exports = {
    UserType,
    userQueries,
    userMutations
};
