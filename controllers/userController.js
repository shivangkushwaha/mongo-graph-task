const User = require('../models/user');
const bcrypt = require('bcryptjs');
const userService = require("../service/userService")
const hepler = require("../appConstant/helper")
const {sendBadResponse, sendSucessResponse, sendServerErrorResponse} = require('./responseController')

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in User:getUsers', error)
        return sendServerErrorResponse(res, error)
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
        console.error('Error in User:createUser', error)
        return sendServerErrorResponse(res, error)
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
        console.error('Error in User:updateUser', error)
        return sendServerErrorResponse(res, error)
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
        console.error('Error in User:deleteUser', error)
        return sendServerErrorResponse(res, error)
    }
};

exports.loginUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await userService.findUserByUsername(userName);

        if (!user) {
            return sendBadResponse(res,'You are not registred with us yet.')
        }
        
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {            
            return sendBadResponse(res,'Password is incorrect' )
        }

        let response = await hepler.generateAccessToken(user.id)
        return sendSucessResponse(res, 'Logged in Sucessfully', response)

    } catch (error) {
        console.error('Error in User:loginUser', error)
        return sendServerErrorResponse(res, error)
    }
};
