import { useSelector, useDispatch } from 'react-redux'
import { increaseVoteOf } from './reducers/anecdoteReducer'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

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
        <form>
            <p>
                <input />
                &nbsp;
                <button>Create</button>
            </p>
        </form>
        </div>
    )
}

export default App