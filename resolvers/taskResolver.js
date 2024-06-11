const Task = require('../models/task');

const taskResolver = {
    Query: {
        task: async (_, { id }) => {
            return await Task.findById(id);
        },
        tasks: async () => {
            return await Task.find({});
        }
    },
    Mutation: {
        addTask: async (_, { title, description, status, dueDate, userId, organizationId }) => {
            const task = new Task({ title, description, status, dueDate, userId, organizationId });
            return await task.save();
        },
        deleteTask: async (_, { id }) => {
            return await Task.findByIdAndRemove(id);
        },
        updateTask: async (_, { id, title, description, status, dueDate }) => {
            return await Task.findByIdAndUpdate(
                id,
                { title, description, status, dueDate },
                { new: true }
            );
        }
    }
};

module.exports = taskResolver;
