const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Manager', 'User']
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
