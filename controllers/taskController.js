const Task = require('../models/task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    const { title, description, status, dueDate, userId, organizationId } = req.body;
    const task = new Task({ title, description, status, dueDate, userId, organizationId });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, status, dueDate },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndRemove(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
