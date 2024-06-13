const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { organizationQueries, organizationMutations } = require('./organizationSchema');
const { userQueries, userMutations } = require('./userSchema');
const { taskQueries, taskMutations } = require('./taskSchema');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...organizationQueries,
        ...userQueries,
        ...taskQueries
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...organizationMutations,
        ...userMutations,
        ...taskMutations
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
