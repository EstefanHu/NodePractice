const { graphql, buildSchema} = require('graphql');

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

graphql(
  schema,
  `
    {
      users {
        email
      }
    }
  `,
  rootValue
).then(
  res => console.dir(res, {depth: null})
  ).catch(
  console.error
);