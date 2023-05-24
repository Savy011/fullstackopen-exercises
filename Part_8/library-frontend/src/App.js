import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommended'
import { BOOK_ADDED } from './queries'

const App = () => {
    const [token, setToken ] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

    const padding = {
        paddingRight: 5
    }
	
	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			const book = data.data.bookAdded
			window.alert(`Book Added: ${book.title} by ${book.author.name}`)
		}
	})

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const Login = () => {
        if (token) {
            return (
                <>
                    <button style={padding} onClick={logout}>Log out</button>
                </>
            )
        } else return <Link style={padding} to='/login'>Login</Link>
    }

    return (
        <div>
            <div>
                <Link style={padding} to='/'>Authors</Link>
                <Link style={padding} to='/books'>Books</Link>
                {token ? <Link style={padding} to='/add-book'>Add Book</Link> : null}
                {token ? <Link style={padding} to='/recommend'>Recommend</Link> : null}
                <Login />
            </div>

            <Routes>
                <Route path='/login' element={<LoginForm setToken={setToken} notify={notify} errorMessage={errorMessage} />} />
                <Route path='/' element={<Authors token={token}/>}/>
                <Route path='/authors' element={ <Navigate replace to='/' />} />
                <Route path='/books' element={<Books />}/>
                <Route path='/add-book' element={token ? <NewBook /> : <Navigate replace to='/login'/> }/>
                <Route path='/recommend' element={token ? <Recommend /> : <Navigate replace to='/login'/> }/>
            </Routes>
        </div>
    )
}

export default App
