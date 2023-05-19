import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import Notif from './Notif'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ notify, setToken, errorMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [ login, result ] = useMutation(LOGIN, {
        onError: error => {
            notify(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('libraryAppUser', token)
            navigate('/')
        }
    }, [result.data])

    const handleSubmit = event => {
        event.preventDefault()
        
        login({ variables: { username, password } })
    }

    return (
        <div>
            <Notif errorMessage={errorMessage}/>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    Username:&nbsp;
                    <input 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </p>
                <p>
                    Password:&nbsp;
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </p>
                <p>
                    <button type='submit'>Log-In</button>
                </p>
            </form>
        </div>
    )
}

export default LoginForm