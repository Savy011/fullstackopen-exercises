import { useSelector, useDispatch } from 'react-redux'
import { increaseVoteOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = id => {
        dispatch(increaseVoteOf(id))
    }
    
    return (
        <div>
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
        </div>
    )
}

export default AnecdoteList