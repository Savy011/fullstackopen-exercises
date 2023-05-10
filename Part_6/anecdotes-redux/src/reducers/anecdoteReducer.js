import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            
            return state.concat({
                content: action.payload,
                votes: 0,
                id: getId()
            })
        },
        voteAnecdote(state, action) {
            const id = action.payload
            const anecdoteToUpdate = state.find(a => a.id === id)
            const updatedAnecdote = {
                ...anecdoteToUpdate,
                votes: anecdoteToUpdate.votes + 1
            }

            return state.map(a => a.id !== id ? a : updatedAnecdote)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer