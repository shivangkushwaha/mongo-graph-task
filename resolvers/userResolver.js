const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userResolver = {
    Query: {
        user: async (_, { id }) => {
            return await User.findById(id);
        },
        users: async () => {
            return await User.find({});
        }
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
        },
        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }

            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is incorrect');
            }

            const token = jwt.sign(
                { userId: user.id, username: user.username, role: user.role },
                'supersecretkey',
                { expiresIn: '1h' }
            );

            return { userId: user.id, token, tokenExpiration: 1 };
        }
    }
};

module.exports = userResolver;
