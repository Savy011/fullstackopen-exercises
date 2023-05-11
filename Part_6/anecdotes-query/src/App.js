import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'

const App = () => {
    const result = useQuery('anecdotes', getAnecdotes, { retry: 1})
    console.log(result)

    if ( result.status === 'loading' ) {
        return <div>Loading data</div>
    }

    if (result.status === 'error') {
        return <div>Anecdote Service is unavailable due to problems in server </div>
    }

    const handleVote = (anecdote) => {
        console.log('vote')
    }

    const anecdotes = result.data

    /*const anecdotes = [
        {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 0
        },
    ]*/

    return (
        <div>
            <h3>Anecdote App</h3>
            
            <Notification />
            <AnecdoteForm />
            
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        Has {anecdote.votes} Votes
                        &nbsp;
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
