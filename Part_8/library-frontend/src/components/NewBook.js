import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useNavigate } from 'react-router-dom'

const NewBook = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [ addBook ] = useMutation(ADD_BOOK, {
        refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
    })

    const submit = async (event) => {
        event.preventDefault()

        await addBook({ variables: { title, author, published: parseInt(published), genres } })

        navigate('/books')
        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
        <form onSubmit={submit}>
            <div>
                <p>
                    Title:&nbsp;
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </p>
            </div>
            <div>
                <p>
                    Author:&nbsp;
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </p>
            </div>
            <div>
                <p>
                    Published:&nbsp;
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </p>
            </div>
            <div>
                <p>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    &nbsp;
                    <button onClick={addGenre} type="button">
                        Add Genre
                    </button>
                </p>
            </div>
            <div><p>Genres: {genres.join(', ')}</p></div>
            <button type="submit">Add Book</button>
        </form>
        </div>
    )
}

export default NewBook
