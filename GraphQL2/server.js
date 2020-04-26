const express = require('express');
const expressGraphQL = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = requrie('graphql');
const app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'HelloWorld',
    fields: () => ({
      message: { 
        type: GraphQLString,
        resolve: () => 'Hello World'
      }
    })
  })
});

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => console.log('Server Running'));