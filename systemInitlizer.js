const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Role = require('./models/role')
const UserRole = require('./models/userRoles')
const Organization = require('./models/organization');
const dbConfig = require('./config/db');

mongoose.connect(dbConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const createAdmin = async () => {
    try {
        // Check if an admin user already exists
        const adminUser = await User.findOne({ role: 'Admin' });
        if (adminUser) {
            console.log('Admin user already exists');
            return;
        }

        // Create a default organization if none exists
        let organization = await Organization.findOne({ name: 'Default Organization' });
        if (!organization) {
            organization = new Organization({ name: 'Default Organization' });
            await organization.save();
        }

        // Create the admin user
        const hashedPassword = await bcrypt.hash('12345678', 12);
       

        const role = await  Role.insertMany([
            {'name':"admin", 'permissions': ["manage_users","manage_orgnizations","manage_users_tasks"]},
            {'name':"admin", 'permissions': ["manage_users_tasks"]},
            {'name':"user", 'permissions': ['manage_tasks']}
        ])

        let admin = new User({
            username: 'admin',
            password: hashedPassword,
            role: 'Admin',
            organizationId: organization._id
        });
        admin = await admin.save();

        const roles = await UserRole.create({userId: admin.id, roleId: role[0].id})
        console.log('Default admin user created');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        mongoose.disconnect();
    }
};

createAdmin();