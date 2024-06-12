const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const models = {};

fs.readdirSync(__dirname).forEach(file => {
    // Skip the index file itself
    if (file === 'index.js') return;

    // Get the model name (file name without extension)
    const modelName = file.split('.')[0];

    // Import the model
    const model = require(path.join(__dirname, file));

    // Add the model to the models object
    models[modelName] = model;

    // Register the model with Mongoose (optional if using Mongoose's automatic model registration)
    mongoose.model(modelName, model.schema);
});

module.exports = models;
