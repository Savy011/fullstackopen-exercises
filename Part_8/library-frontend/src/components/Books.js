import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
    const result = useQuery(ALL_BOOKS)

    if (result.loading) {
        return <div>Loading Data...</div>
    }

    const books = result.data.allBooks
    
    if (!books) {
        return <div>Data Not Available...</div>
    }

    return (
        <div>
        <h2>Books</h2>

        <table>
            <tbody>
            <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
            </tr>
                {books.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default Books