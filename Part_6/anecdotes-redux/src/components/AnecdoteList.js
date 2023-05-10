import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter !== '') {
            return anecdotes.filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
        }
        return anecdotes
    })
    let anecdotesToSort = [ ...anecdotes ]

    const dispatch = useDispatch()

    const vote = id => {
        dispatch(voteAnecdote(id))
        dispatch(notifChange('Voted Anecdote'))
    }
    
    return (
        <div>
            {anecdotesToSort.sort((a, b) => b.votes - a.votes).map(anecdote =>
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