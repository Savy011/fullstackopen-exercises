import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment bookDetails on Book {
    title
    published
    author {
        name
        born
    }
    genres
}
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query AllBooks ($genre: String){
    allBooks(genre: $genre) {
        ...bookDetails
    }
}

${BOOK_DETAILS}
`

export const ME = gql`
query Me {
    me {
        username
        favouriteGenre
    }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres
    ) {
        ...bookDetails
    }
}
${BOOK_DETAILS}
`

export const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $born    
    ) {
        name
        born
    }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        value
    }
}
`