const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const { username, password, role, organizationId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, role, organizationId });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { username, role },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndRemove(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }

        const role = 
        // const token = jwt.sign(
        //     { userId: user.id, username: user.username, role: user.role },
        //     'supersecretkey',
        //     { expiresIn: '1h' }
        // );

        res.status(200).json({ userId: user.id, token, tokenExpiration: 1 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
