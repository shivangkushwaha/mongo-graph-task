const User = require('../models/user')
const UserRole = require("../models/userRoles")
module.exports = {
    findUser:async (id)=>{
        try {
            const user = await User.findOne({ _id: id }).select('id')
            const roles = await UserRole.find({ userId: user._id },{'password':0})
            .populate({
                path: 'roleId',
                model: 'Role'
            }).lean()
            .exec();
            const userRoles = [] 
            const scope = roles.reduce((acc, role) => {
                const {permissions, name} = role.roleId
                userRoles.push(name)
                return [...acc, ...permissions, name];
            }, []);
            
            return {user, scope, userRoles};
        } catch(error){
            console.error("Error in user service findUser", error)
            throw new Error(error)
        }
    },
    findUserByUsername:async (username)=>{
        try {
            const user = await User.findOne({ username: username })
            return user;
        } catch(error){
            console.error("Error in user service findUserByUsername", error)
            throw new Error(error)
        }
    },
}