
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schemas');
const authMiddleware = require('./middleware/authMiddleware');
const rbacMiddleware = require('./middleware/rbacMiddleware');
const dbConfig = require('./config/db');

const app = express();
app.use(express.json());

mongoose.connect(dbConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(authMiddleware);
app.use('/graphql', rbacMiddleware, graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
