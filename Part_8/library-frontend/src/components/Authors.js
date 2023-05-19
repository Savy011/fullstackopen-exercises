import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'

const Authors = ({ token }) => {
    const result = useQuery(ALL_AUTHORS)
    
    if (result.loading) {
        return <div>Loading Data...</div>
    }

    const authors = result.data.allAuthors
    
    if (!authors) {
        return <div>Data Not Available...</div>
    }

    return (
        <div>
        <h2>Authors</h2>
        <table>
            <tbody>
            <tr>
                <th></th>
                <th>Born</th>
                <th>Books</th>
            </tr>
                {authors.map((a) => (
                    <tr key={a.name}>
                    <td>{a.name}</td>
                    <td>{a.born}</td>
                    <td>{a.bookCount}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        {token ? <BirthYearForm authors={authors}/> : null }
        </div>
    )
}

export default Authors
