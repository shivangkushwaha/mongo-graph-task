const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { scopeValidator } = require('../middleware/scopeMiddlewares');

const userResolver = {
    Query: {
        user: async (_, { id }) => {
            return await User.findById(id);
        },
        users: scopeValidator(['ad'])(async () => {
            console.log("Hii>>>>>>>>>>>")
            return await User.find({});
        })
    },
    Mutation: {
        addUser: async (_, { username, password, role, organizationId }) => {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ username, password: hashedPassword, role, organizationId });
            return await user.save();
        },
        deleteUser: async (_, { id }) => {
            return await User.findByIdAndRemove(id);
        },
        updateUser: async (_, { id, username, role }) => {
            return await User.findByIdAndUpdate(
                id,
                { username, role },
                { new: true }
            );
        }
    }
};

module.exports = userResolver;
