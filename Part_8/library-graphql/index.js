const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
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
        allBooks: async () => {
            const books = await Book.find({}).populate('author')

            return books
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
                await authorInDB.save()
            }

            const book = new Book({ title, published, genres, author: authorInDB._id })
            
            await book.save()
            return book.populate('author')
        },
        editAuthor: (root, args) => {
            //TODO
            return null
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