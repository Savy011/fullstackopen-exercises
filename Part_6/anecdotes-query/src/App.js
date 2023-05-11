import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import { NotifContext } from './NotifReducer'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
    const queryClient = useQueryClient()
    const result = useQuery('anecdotes', getAnecdotes, { retry: 1})
    const updateVoteMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
            const anecdotes = queryClient.getQueryData('anecdotes')
            queryClient.invalidateQueries('anecdotes')

        }
    })

    const [notif, notifDispatch] = useContext(NotifContext)
    
    if ( result.status === 'loading' ) {
        return <div>Loading data</div>
    }

    if (result.status === 'error') {
        return <div>Anecdote Service is unavailable due to problems in server </div>
    }

    const handleVote = (anecdote) => {
        updateVoteMutation.mutate(anecdote)
        notifDispatch({ type: 'SET', payload: `Voted Anecdote '${anecdote.content}'`})
        setTimeout(() => {
            notifDispatch({ type: 'CLEAR'})
        }, 5000);
    }

    const anecdotes = result.data

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
