import { useSelector, useDispatch } from 'react-redux'
import { increaseVoteOf, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const addAnecdote = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    const vote = (id) => {
        dispatch(increaseVoteOf(id))
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                <p>{anecdote.content}</p>
            </div>
            <div>
                Has {anecdote.votes} Votes
                &nbsp;
                <button onClick={() => vote(anecdote.id)}>Vote</button>
            </div>
            </div>
        )}
        <h2>Create New</h2>
        <form onSubmit={addAnecdote}>
            <p>
                <input name='anecdote' />
                &nbsp;
                <button type='submit'>Create</button>
            </p>
        </form>
        </div>
    )
}

export default App