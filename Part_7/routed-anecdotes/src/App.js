import { useState } from 'react'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import { useNavigate, Navigate, Route, Routes, useMatch } from 'react-router-dom'
import Notification from './components/Notification'

const App = () => {
    const [notification, setNotification] = useState('')
    const [anecdotes, setAnecdotes] = useState([
        {
        content: 'If it hurts, do it more often',
        author: 'Jez Humble',
        info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
        votes: 0,
        id: 1
        },
        {
        content: 'Premature optimization is the root of all evil',
        author: 'Donald Knuth',
        info: 'http://wiki.c2.com/?PrematureOptimization',
        votes: 0,
        id: 2
        }
    ])

    const navigate = useNavigate()
    const match = useMatch('/anecdotes/:id')
    const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`Added ${anecdote.content}`)
        setTimeout(() => {
            setNotification('')
        }, 5000)
        navigate('/')
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
        ...anecdote,
        votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <div>
            <div>
                <h1>Software Anecdotes</h1>
                <Menu />
                <Notification notification={notification} />
            </div>

            <Routes>
                <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
                <Route path='/anecdotes' element={<Navigate route to='/'/>}/>
                <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/create' element={<CreateNew addNew={addNew} />}/>
            </Routes>
            
            <Footer />
        </div>
    )
}

export default App
