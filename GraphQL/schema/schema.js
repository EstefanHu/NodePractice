const graphql = require('graphql');

const {
    graphQLOBjectType,
    GraphQLString,
    GraphGLSchema
} = graphql;

const BookType = new graphQLOBjectType({
    name: 'Book',

    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new graphQLOBjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                args.id
            }
        }
    }
})

module.exports = new graphQLSchema({
    query: RootQuery
});