const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1:uuid } = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    { 
        name: 'Joshua Kerievsky',
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
        name: 'Sandi Metz',
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },  
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = `
    type Book {
        title: String!
        author: String!
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
        addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book!
        editAuthor(name: String!, setBornTo: Int!): Author!
    }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            if (args.author) {
                return books.filter(book => book.author === args.author)
            }

            if (args.genre) {
                return books.filter(book => book.genres.includes(args.genre))
            }

            return books
        },
        allAuthors: () => {
            return authors.map(a => {
                const bookCount = books.filter(book => book.author === a.name).length
                return { ...a, bookCount }
            })
        }
    },
    Mutation: {
        addBook: (root, args) => {
            const { title, author, genres, published } = args
            let existingAuthor = authors.find(a => a.name.toLowerCase() === author.toLowerCase())

            if (!existingAuthor) {
                const newAuthor = {
                    name: author,
                    id: uuid(),
                    born: null
                }

                authors.push(newAuthor)
                existingAuthor = newAuthor
            }
            
            const newBook = {
                title: title,
                author: existingAuthor.name,
                published: published,
                genres: genres,
                id: uuid()
            }

            books.push(newBook)

            return newBook
        },
        editAuthor: (root, args) => {
            const { name, setBornTo } = args
            const author = authors.find(a => a.name === name)

            if (!author) {
                throw new Error(`Author '${name}' not found.`);
            }

            const updatedAuthor = { ...author, born: setBornTo }
            authors = authors.map(a => a.name === name ? updatedAuthor : a)

            const booksByAuthor = books.filter(b => b.author === name)
            booksByAuthor.forEach(b => (b.author = updatedAuthor))
            updatedAuthor.bookCount = booksByAuthor.length

            return updatedAuthor
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