const Task = require('../models/task');

const taskResolver = {
    getTask: async (id) => {
        return await Task.findById(id);
    },
    getAllTasks: async () => {
        return await Task.find({});
    },
    createTask: async (title, description, status, dueDate, userId, organizationId) => {
        const task = new Task({
            title,
            description,
            status,
            dueDate,
            userId,
            organizationId
        });
        return await task.save();
    },
    deleteTask: async (id) => {
        return await Task.findByIdAndRemove(id);
    },
    updateTask: async (id, title, description, status, dueDate) => {
        return await Task.findByIdAndUpdate(id, { title, description, status, dueDate }, { new: true });
    }
};

module.exports = taskResolver;
