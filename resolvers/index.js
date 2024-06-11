const fs = require('fs');
const path = require('path');

const resolvers = {};

fs.readdirSync(__dirname).forEach(file => {
    // Skip the current file to prevent self-inclusion
    if (file !== 'index.js') {
        const resolver = require(path.join(__dirname, file));
        Object.assign(resolvers, resolver);
    }
});

module.exports = resolvers;
