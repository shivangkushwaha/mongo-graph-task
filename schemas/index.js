const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const fs = require('fs');
const path = require('path');

// Function to dynamically load fields from schema files
const loadFields = (type) => {
    const fields = {};
    fs.readdirSync(__dirname).forEach(file => {
        // Skip the current file to prevent self-inclusion
        if (file !== 'index.js') {
            const schema = require(path.join(__dirname, file));
            Object.assign(fields, schema[type]);
        }
    });
    return fields;
};

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: loadFields('queries')
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: loadFields('mutations')
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
