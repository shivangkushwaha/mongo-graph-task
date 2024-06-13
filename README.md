
# Task Management API

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and add the necessary environment variables
4. Run `npm start` to start the application

Areas of work :-
1. We need to create the services for handle each small funcnality 
2. We Need to implement the pagination.
3. We can work on to remove single public endpoint for set the login 
4. We can work on the logics.
5. We can write test cases for handle unit test case.

Completed Areas:-
1. Setup:
- Initialize a new Node.js project.
- Set up Express.js for handling HTTP requests.
- Configure MongoDB as the database.
- Set up GraphQL using `graphql` and `express-graphql`.

2. Multi-Tenancy:
- Implement multi-tenancy where multiple organizations can have their own separate data.
- Use an appropriate strategy to segregate data per tenant.

3. Role-Based Access Control (RBAC):
- Implement RBAC with at least three roles: `Admin`, `Manager`, and `User`.
- `Admin` can create, update, delete, and view tasks for any user within the organization.
- `Manager` can create, update, delete, and view tasks for users they manage.
- `Users` can only create and view their tasks.

4. Database Schema:
- Design and implement Mongoose models for `User`, `Organization`, and `Task`.
- The `User` model should include fields such as `username`, `password`, `role`, and `organizationId`.
- The `Organization` model should include fields such as `name`.
- The `Task` model should include fields such as `title`, `description`, `status`, `dueDate`, `userId`, and `organizationId`.

5. GraphQL Schema:
- Design a GraphQL schema with the following types and operations:
- `Organization`, `User`, and `Task` types with necessary fields.
- Queries to retrieve organizations, users, and tasks.
- Mutations to create, update, and delete organizations, users, and tasks.

6. API Endpoints:
- Implement the GraphQL API with resolvers to handle the designed queries and mutations.
- Ensure proper error handling and validation.
- Implement middleware for authentication and role-based authorization.

7. Authentication:
- Implement JWT-based authentication.
- Protect all endpoints with authentication middleware