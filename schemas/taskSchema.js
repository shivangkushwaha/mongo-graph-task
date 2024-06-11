const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql');
const Task = require('../models/task');
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        dueDate: { type: GraphQLString },
        userId: { type: GraphQLID },
        organizationId: { type: GraphQLID }
    })
});

const taskQueries = {
    task: {
        type: TaskType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Task.findById(args.id);
        }
    },
    tasks: {
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
            return Task.find({});
        }
    }
};

const taskMutations = {
    addTask: {
        type: TaskType,
        args: {
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            status: { type: GraphQLString },
            dueDate: { type: GraphQLString },
            userId: { type: GraphQLID },
            organizationId: { type: GraphQLID }
        },
        resolve(parent, args) {
            let task = new Task({
                title: args.title,
                description: args.description,
                status: args.status,
                dueDate: args.dueDate,
                userId: args.userId,
                organizationId: args.organizationId
            });
            return task.save();
        }
    },
    deleteTask: {
        type: TaskType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return Task.findByIdAndRemove(args.id);
        }
    },
    updateTask: {
        type: TaskType,
        args: {
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            status: { type: GraphQLString },
            dueDate: { type: GraphQLString }
        },
        resolve(parent, args) {
            return Task.findByIdAndUpdate(
                args.id,
                { title: args.title, description: args.description, status: args.status, dueDate: args.dueDate },
                { new: true }
            );
        }
    }
};

module.exports = {
    TaskType,
    taskQueries,
    taskMutations
};
