import { ApolloConsumer, useQuery, useSubscription } from '@apollo/client'
import { union } from 'lodash'
import { ALL_BOOKS } from '../queries'
import { BOOK_ADDED } from '../queries.js'
import { useState } from 'react'
import { useEffect } from 'react'

const getAllGenres = (books) => {
	const allGenres = union(...books.map(book => book.genres))
	return allGenres
}

const Books = () => {
	const [selectedGenre, setSelectedGenre] = useState(null)
	const [books, setBooks] = useState([])
	const [allGenres, setAllGenres] = useState([])
	const result = useQuery(ALL_BOOKS, {
		variables: { genre: selectedGenre }
	})

	useEffect(() => {
		if (result.data) {
			const allBookGenres = getAllGenres(result.data.allBooks)
			setAllGenres(allBookGenres)
		}
	}, [])

	useEffect(() => {
		if (result.data) {
			setBooks(result.data.allBooks)
		}
	}, [result.data])

	useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
		  const addedBook = data.data.bookAdded
		  setBooks((prevBooks) => {
			const updatedBooks = prevBooks.concat(addedBook)
			return selectedGenre ? updatedBooks.filter((book) => book.genres.includes(selectedGenre)) : updatedBooks
		  })
		},
	  })


    if (result.loading) {
        return <div>Loading Data...</div>
    }

    if (!books) {
        return <div>Data Not Available...</div>

    }

    const filteredBooks = books.filter(book => book.genres.includes(selectedGenre))
	//const genres = union(...books.map(book => book.genres))

    const booksToMap = filteredBooks.length === 0 ? books : filteredBooks 


    const handleFilter = async (event, client) => {
        event.preventDefault()
		setSelectedGenre(event.target.filterMenu.value)
		const { data } = await client.query({
			query: ALL_BOOKS,
			variables: { genre: selectedGenre },
		});

    	setBooks(data.allBooks);
	}

	return (
		<ApolloConsumer>
			{client => (
				<div>
				<h2>Books</h2>

				<div className='filter'>
					<form onSubmit={event => handleFilter(event, client)}>
						Genre Filter:&nbsp;
						<select name='filterMenu'>
							<option value={''}>All Genres</option>
							{allGenres.map(genre => (
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
						<th>Author</th>
						<th>Published</th>
					</tr>
						{booksToMap.map((a) => (
							<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td className='yearTd' >{a.published}</td>
							</tr>
						))}
					</tbody>
				</table>
				</div>
				)}
		</ApolloConsumer>
    )
}

export default Books
