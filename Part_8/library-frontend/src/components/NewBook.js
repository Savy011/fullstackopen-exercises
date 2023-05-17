import { useState } from 'react'

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        console.log('add book...')

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
                    published
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
                        add genre
                    </button>
                </p>
            </div>
            <div><p>genres: {genres.join(', ')}</p></div>
            <button type="submit">create book</button>
        </form>
        </div>
    )
}

export default NewBook