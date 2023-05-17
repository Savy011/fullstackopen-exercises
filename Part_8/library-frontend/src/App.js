import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

const App = () => {
    const [page, setPage] = useState('authors')
    const result = useQuery(ALL_AUTHORS)

    if (result.loading) {
        return <div>Loading Data...</div>
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>Authors</button>
                <button onClick={() => setPage('books')}>Books</button>
                <button onClick={() => setPage('add')}>Add Book</button>
            </div>

            <Authors show={page === 'authors'} authors={result.data.allAuthors} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />
        </div>
    )
}

export default App
