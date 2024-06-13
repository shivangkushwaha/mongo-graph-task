const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Role = require('../models/role');

const userResolver = {
    getUser: async (id) => {
        return await User.findById(id);
    },
    getAllUsers: async () => {
        return await User.find({});
    },
    createUser: async (username, password, roleId, organizationId) => {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            password: hashedPassword,
            roleId,
            organizationId
        });
        return await user.save();
    },
    deleteUser: async (id) => {
        return await User.findByIdAndRemove(id);
    },
    updateUser: async (id, username, roleId) => {
        return await User.findByIdAndUpdate(id, { username, roleId }, { new: true });
    },
    loginUser: async (username, password) => {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect');
        }

        const role = await Role.findById(user.roleId);
        if (!role) {
            throw new Error('Role not found');
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, role: role.name },
            'supersecretkey',
            { expiresIn: '1h' }
        );

        return { userId: user.id, token, tokenExpiration: '1h' };
    }
};

module.exports = userResolver;
