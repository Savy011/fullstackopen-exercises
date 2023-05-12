import { useState } from 'react'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    /*const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')*/
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
        })
    }

    return (
        <div>
        <h2>Create a New Anecdote</h2>
        <form onSubmit={handleSubmit}>
            <p>
                Content: &nbsp;
                <input type={content.type} value={content.value} onChange={content.onChange} />
            </p>
            <p>
                Author: &nbsp;
                <input type={author.type} value={author.value} onChange={author.onChange} />
            </p>
            <p>
                Url for more info: &nbsp;
                <input type={info.type} value={info.value} onChange={info.onChange} />
            </p>
            <button>Create</button>
        </form>
        </div>
    )
}

export default CreateNew