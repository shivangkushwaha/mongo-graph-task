
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schemas');
const {authentication} = require('./middleware/authMiddleware');
const dbConfig = require('./config/db');
const Fs = require('fs')
const models = require("./models/index");

const app = express();
app.use(express.json());


let routes = []
let routerPath = process.cwd() + "/router";
Fs.readdirSync(routerPath).filter(function (file) {
    let routers_data = require(routerPath + `/${file}`);
    routes.push(routers_data);
});

app.use("/api", routes);

mongoose.connect(dbConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    app.use('/graphql', authentication , graphqlHTTP((req) => ({
        schema: schema,
        graphiql: true,
        context: { user: req.auth.user, scope: req.auth.scope }
      })));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
