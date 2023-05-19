import { useQuery } from '@apollo/client'
import { union } from 'lodash'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = () => {
    const [selectedGenre, setSelectedGenre] = useState(null)
    const result = useQuery(ALL_BOOKS)

    if (result.loading) {
        return <div>Loading Data...</div>
    }

    const books = result.data.allBooks
    
    if (!books) {
        return <div>Data Not Available...</div>
    }

    const filteredBooks = books.filter(book => book.genres.includes(selectedGenre))
    const genres = union(...books.map(book => book.genres))

    const booksToMap = filteredBooks.length === 0 ? books : filteredBooks 

    const handleFilter = event => {
        event.preventDefault()
        setSelectedGenre(event.target.filterMenu.value)
    }
    return (
        <div>
        <h2>Books</h2>
        
        <div>
            <form onSubmit={handleFilter}>
                Genre Filter:&nbsp;
                <select name='filterMenu'>
                    <option value={null}>All Genres</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
                &nbsp;
                <button type='submit'>Filter</button>
            </form>
        </div>

        <table>
            <tbody>
            <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
            </tr>
                {booksToMap.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default Books
