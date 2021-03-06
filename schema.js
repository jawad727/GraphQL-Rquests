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

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const book = {
                    title: args.title,
                    id: books.length,
                    available: true
                }

                books.push(book)
                return book
            }
        },
        editBook: {
            type: BookType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                title: { type: GraphQLString },
                available: { type: GraphQLBoolean }
            },
            resolve(parentValue, args) {
                const index = books.findIndex((b) => b.id == args.id)

                if (index > -1) {
                    if (args.title) books[index].title = args.title;
                    if (args.hasOwnProperty("available")) books[index].available = args.available;
                     return books[index]
                }
            }
        },
        deleteBook: {
            type: BookType,
            args: {
               id: { type: new GraphQLNonNull(GraphQLInt) } 
            },
            resolve(parentValue, args) {
                const index = books.findIndex((b) => b.id === args.id)
                if (index > -1) {
                    const elem = books.splice(index, 1)[0]
                    return elem
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})