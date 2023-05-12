import { useState } from 'react'

const CreateNew = (props) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
        content,
        author,
        info,
        votes: 0
        })
    }

    return (
        <div>
        <h2>Create a New Anecdote</h2>
        <form onSubmit={handleSubmit}>
            <p>
                Content: &nbsp;
                <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
            </p>
            <p>
                Author: &nbsp;
                <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
            </p>
            <p>
                Url for more info: &nbsp;
                <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
            </p>
            <button>Create</button>
        </form>
        </div>
    )
}

export default CreateNew