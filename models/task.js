const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'InProgress', 'Completed']
    },
    dueDate: {
        type: Date,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
});

module.exports
