import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifChange } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(notifChange('Anecdote Added'))
        setTimeout(() => {
            dispatch(notifChange(''))
        }, 5000)
    }

    return (
        <div>
            <h2>Create New Anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' />
                &nbsp;
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm