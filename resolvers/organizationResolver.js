const Organization = require('../models/organization');

const organizationResolver = {
    getOrganization: async (id) => {
        return await Organization.findById(id);
    },
    getAllOrganizations: async () => {
        return await Organization.find({});
    },
    createOrganization: async (name) => {
        const organization = new Organization({ name });
        return await organization.save();
    },
    deleteOrganization: async (id) => {
        return await Organization.findByIdAndRemove(id);
    },
    updateOrganization: async (id, name) => {
        return await Organization.findByIdAndUpdate(id, { name }, { new: true });
    }
};

module.exports = organizationResolver;
