'use strict';
const express = require('express');
const app = express();
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const db = {
  users: [
    {id: '1', email: 'alex@gmail.com', name: 'Alex'},
    {id: '2', email: 'max@gmail.com', name: 'Max'},
    {id: '3', email: 'steve@gmail.com', name: 'Steve'},
  ]
}

const schema = buildSchema(`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
  }
`);

const rootValue = {
  users: () => db.users
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(3000, () => console.log('listening on port 3000'));