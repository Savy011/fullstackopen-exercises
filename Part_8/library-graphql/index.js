const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const { GraphQLError } = require('graphql')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to MongoDB')
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Error connecting to MongoDB', err.message)
})

const typeDefs = `
    type Book {
        title: String!
        author: Author!
        published: Int!
        id: ID!
        genres: [String]!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book!
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre && args.author) {
                const queriedAuthor = await Author.findOne({ name: args.author })
                
                if (!queriedAuthor) return null

                return Book.find({ author: queriedAuthor.id, genres: { $in: [args.genre] } }).populate('author')
            }

            if (args.author) {
                const queriedAuthor = await Author.findOne({ name: args.author })
                
                if (!queriedAuthor) return null

                return Book.find({ author: queriedAuthor.id }).populate('author')
            }

            return Book.find({}).populate('author')
        },
        allAuthors: async () => {
            const authors = await Author.find({})

            return authors
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const { title, author, published, genres } = args

            let authorInDB = await Author.findOne({ name: author })

            if (!authorInDB) {
                authorInDB = new Author({ name: author })

                try {
                    await authorInDB.save()
                } catch (error) {
                    throw new GraphQLError('Saving Author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                            error
                        }
                    })
                }
            }

            const book = new Book({ title, published, genres, author: authorInDB._id })
           
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving Book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }
            return book.populate('author')
        },
        editAuthor: async (root, args) => {
            const { name, setBornTo } = args
            const authorToUpdate = await Author.findOne({ name: name })

            if (!authorToUpdate) return null

            authorToUpdate.born = setBornTo
            
            try {
                await authorToUpdate.save()
            } catch (error) {
                throw new GraphQLError('Updated Author Failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }

            return authorToUpdate
        }
    },
    Author: {
        bookCount: async (root) => {
            const foundAuthor = await Author.findOne({ name: root.name })
            const booksByAuthor = await Book.find({ author: foundAuthor.id })
            return booksByAuthor.length 
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})