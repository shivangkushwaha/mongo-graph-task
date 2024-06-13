const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const taskResolver = require('../resolvers/taskResolver');

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
            return taskResolver.getTask(args.id);
        }
    },
    tasks: {
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
            return taskResolver.getAllTasks();
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
            return taskResolver.createTask(args.title, args.description, args.status, args.dueDate, args.userId, args.organizationId);
        }
    },
    deleteTask: {
        type: TaskType,
        args: {
            id: { type: GraphQLID }
        },
        resolve(parent, args) {
            return taskResolver.deleteTask(args.id);
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
            return taskResolver.updateTask(args.id, args.title, args.description, args.status, args.dueDate);
        }
    }
};

module.exports = {
    TaskType,
    taskQueries,
    taskMutations
};
