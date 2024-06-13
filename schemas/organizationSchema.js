const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const organizationResolver = require('../resolvers/organizationResolver');

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
            return organizationResolver.getOrganization(args.id);
        }
    },
    organizations: {
        type: new GraphQLList(OrganizationType),
        resolve(parent, args) {
            return organizationResolver.getAllOrganizations();
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
            return organizationResolver.createOrganization(args.name);
        }
    },
    deleteOrganization: {
        type: OrganizationType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return organizationResolver.deleteOrganization(args.id);
        }
    },
    updateOrganization: {
        type: OrganizationType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString }
        },
        resolve(parent, args) {
            return organizationResolver.updateOrganization(args.id, args.name);
        }
    }
};

module.exports = {
    OrganizationType,
    organizationQueries,
    organizationMutations
};
