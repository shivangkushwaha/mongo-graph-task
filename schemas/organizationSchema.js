const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const Organization = require('../models/organization');
const OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const organizationQueries = {
    organization: {
        type: OrganizationType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Organization.findById(args.id);
        }
    },
    organizations: {
        type: new GraphQLList(OrganizationType),
        resolve(parent, args) {
            return Organization.find({});
        }
    }
};

const organizationMutations = {
    addOrganization: {
        type: OrganizationType,
        args: {
            name: { type: GraphQLString }
        },
        resolve(parent, args) {
            let organization = new Organization({
                name: args.name
            });
            return organization.save();
        }
    },
    deleteOrganization: {
        type: OrganizationType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return Organization.findByIdAndRemove(args.id);
        }
    },
    updateOrganization: {
        type: OrganizationType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString }
        },
        resolve(parent, args) {
            return Organization.findByIdAndUpdate(args.id, { name: args.name }, { new: true });
        }
    }
};

module.exports = {
    OrganizationType,
    organizationQueries,
    organizationMutations
};
