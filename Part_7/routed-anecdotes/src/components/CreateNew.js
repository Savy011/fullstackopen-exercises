import { useState } from 'react'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const removeReset = obj => {
        const { reset, ...retObj } = obj
        return retObj
    }

    const handleReset = () => {
        content.reset()
        author.reset()
        info.reset()
    }

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
                <input { ...removeReset(content) } />
            </p>
            <p>
                Author: &nbsp;
                <input { ...removeReset(author) } />
            </p>
            <p>
                Url for more info: &nbsp;
                <input { ...removeReset(info) } />
            </p>
            <button type='submit'>Create</button>
            &nbsp;
            <button type='reset' onClick={handleReset}>Reset</button>
        </form>
        </div>
    )
}

export default CreateNew