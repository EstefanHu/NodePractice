'use strict';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema, // or schema since they are the same
    graphiql: true
}));

const DB_CONNECTION = 'GraphTesting';
mongoose.connect(`mongodb://localhost/${DB_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
