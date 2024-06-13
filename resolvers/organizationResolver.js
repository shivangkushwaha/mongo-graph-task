const Organization = require('../models/organization');


const organizationResolver = {
    Query: {
        organization: async (_, { id }) => {
            return await Organization.findById(id);
        },
        organizations: async () => {
            return await Organization.find({});
        }
    },
    Mutation: {
        addOrganization: async (_, { name }) => {
            const organization = new Organization({ name });
            return await organization.save();
        },
        deleteOrganization: async (_, { id }) => {
            return await Organization.findByIdAndRemove(id);
        },
        updateOrganization: async (_, { id, name }) => {
            return await Organization.findByIdAndUpdate(id, { name }, { new: true });
        }
    }
};

module.exports = organizationResolver;
