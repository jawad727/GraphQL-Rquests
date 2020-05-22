const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

const books = [
    {
        id: 0,
        title: "Moby Dick",
        available: true
    },
    {
        id: 1,
        title: "Harry Potter",
        available: true
    }
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        available: { type: GraphQLBoolean }
    }
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args) {
                return books; // Normally you'd be getting this info from the DB but for the sake of learning its just a local variable
            }
        },
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parentValue, args) {
                return books.find((b) => b.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})