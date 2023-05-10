import { useSelector, useDispatch } from 'react-redux'
import { increaseVoteOf, createAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(increaseVoteOf(id))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
            <AnecdoteForm />
        </div>
    )
}

export default App