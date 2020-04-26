'use strict';
const {ApolloServer, gql} = require('ApolloServer');
const crypto = require('crypto');

const db = {
  users: [
    {id: '1', email: 'alex@gmail.com', name: 'Alex', avatarUrl: 'https://gravatar.com/...'},
    {id: '2', email: 'max@gmail.com', name: 'Max', avatarUrl: 'https://gravatar.com/...'},
    {id: '3', email: 'steve@gmail.com', name: 'Steve', avatarUrl: 'https://gravatar.com/...'},
  ],
  messages: [
    {id: '1', userId: '1', body: 'Hello', createdAt: Date.now()},
    {id: '2', userId: '2', body: 'Hi', createdAt: Date.now()},
    {id: '3', userId: '1', body: 'Whatsup', createdAt: Date.now()},
  ]
}

class User {
  constructor (user) {
    Object.assign(this, user)
  }

  get messages () {
    return db.messages.filter(message => message.userId === this.id);
  }
}

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String!, name: String): User
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    body: String!
    createdAt: String
  }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    user: (root, {id}) => db.users.find(user => user.id === args.id),
    messages: () => db.messages,
  },
  Mutattion: {
    addUser: (root, {email, name}) => {
      const user = {
        id: crypto.randomBytes(10).toString('hex'),
        email,
        name
      }
  
      db.users.push(user)
  
      return user
    }
  }
}