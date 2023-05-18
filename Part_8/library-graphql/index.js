const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
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

    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
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
        createUser(
            username: String!
            favouriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
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
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            const { title, author, published, genres } = args

            if (!currentUser) {
                throw new GraphQLError('Not Authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

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
        editAuthor: async (root, args, { currentUser }) => {
            const { name, setBornTo } = args
            
            if (!currentUser) {
                throw new GraphQLError('Not Authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

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
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favouriteGenre: args.favouriteGenre
            })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'supersecretpass') {
                throw new GraphQLError('Wrong Credentails', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
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
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )

            const currentUser = await User.findById(decodedToken.id)

            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})