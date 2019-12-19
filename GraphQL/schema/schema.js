const graphql = require('graphql');

const {
    graphQLOBjectType,
    GraphQLString
} = graphql;

const BookType = new graphQLOBjectType({
    name: 'Book',

    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

