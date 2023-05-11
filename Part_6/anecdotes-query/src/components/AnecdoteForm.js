import { postAnecdote } from '../requests'
import { useQueryClient, useMutation } from 'react-query'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation(postAnecdote, {
        onSuccess: () => {
            const anecdotes = queryClient.getQueryData('anecdotes')
            queryClient.invalidateQueries('anecdotes', anecdotes.concat())
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate(content)
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
