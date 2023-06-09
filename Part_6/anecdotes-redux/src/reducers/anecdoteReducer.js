import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteAnecdote(state, action) {
            const id = action.payload.id
            const anecdoteToUpdate = state.find(a => a.id === id)
            const updatedAnecdote = {
                ...anecdoteToUpdate,
                votes: anecdoteToUpdate.votes + 1
            }

            return state.map(a => a.id !== id ? a : updatedAnecdote)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnec = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnec))
    }
}

export const vote = content => {
    return async dispatch => {
        const anecToUpdate = { ...content, votes: content.votes + 1 }
        const updatedAnecdote = await anecdoteService.update(anecToUpdate)
        dispatch(voteAnecdote(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer