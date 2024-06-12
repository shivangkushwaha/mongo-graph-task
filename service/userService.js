const User = require('../models/user')
const UserRole = require("../models/userRoles")
module.exports = {
    findUser:async (id)=>{
        try {
            console.log("fatching user by id ", id)
            const user = await User.findOne({ _id: id })
            const roles = await UserRole.find({ userId: user._id })
            .populate({
                path: 'roleId',
                model: 'Role'
            })
            .exec();
            console.log('user', user)
            console.log('roles', roles)
            // for (){
            //     console.log(role)
            //     // scope.push(role.name, [...role.roleId.permissions])
            // }
           
            // const scope = roles.reduce((acc, role) => {
            //     const { name, permissions } = role.roleId;
            //     console.log('role',permissions)
            //     return [...acc, ...permissions, name];
            // }, []);
            
            console.log('scope',scope)
            return user;
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