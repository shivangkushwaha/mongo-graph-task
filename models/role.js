const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Role', RoleSchema);
