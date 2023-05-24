import { useQuery, useSubscription } from '@apollo/client'
import { updateCache } from '../App'
import { ALL_BOOKS, BOOK_ADDED, ME } from '../queries'

const Recommend = () => {
    const result = useQuery(ME)
    const bookResult = useQuery(ALL_BOOKS)

	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			const addedBook = data.data.bookAdded
			if (addedBook) {
				const updatedBooks = bookResult.data.allBooks.concat(addedBook)
				bookResult.allBooks = updatedBooks
			}
		}
	})

    if (result.loading || bookResult.loading) {
        return <div>Loading Data...</div>
    }

    const user = result.data.me
	const userBooks = bookResult.data.allBooks.filter(book => book.genres.includes(user.favouriteGenre))

    if (!user || !userBooks) {
        return <div>Data Not Available...</div>
    }
    return (
        <div>
            <h2>Recommendations</h2>
            <p>Your Favourite Genre: <b>{user.favouriteGenre}</b></p>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                    {userBooks.map((a) => (
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

export default Recommend
