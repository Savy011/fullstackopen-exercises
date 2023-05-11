import { postAnecdote } from '../requests'
import { useContext } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { NotifContext } from '../NotifReducer'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation(postAnecdote, {
        onSuccess: () => {
            const anecdotes = queryClient.getQueryData('anecdotes')
            queryClient.invalidateQueries('anecdotes', anecdotes.concat())
        }
    })
    const [notif, notifDispatch] = useContext(NotifContext)

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate(content)
        notifDispatch({ type: 'SET', payload: `Added Anecdote '${content}'`})
        setTimeout(() => {
            notifDispatch({ type: 'CLEAR'})
        }, 5000);
    }

    return (
        <div>
        <h3>Create New</h3>
        <form onSubmit={onCreate}>
            <input name='anecdote' />
            <button type="submit">create</button>
        </form>
        </div>
  )
}

export default AnecdoteForm
