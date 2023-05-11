import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () =>  {
    const response = await axios.get(baseUrl)

    return response.data
}

export const postAnecdote = async content => {
    const postObj = { content, votes: 0 }
    const response = await axios.post(baseUrl, postObj)

    return response.data
}

export const updateAnecdote = async obj => {
    const updatedObj = { ...obj, votes: obj.votes + 1 }
    const response = await axios.put(`${baseUrl}/${obj.id}`, updatedObj)

    return response.data
}