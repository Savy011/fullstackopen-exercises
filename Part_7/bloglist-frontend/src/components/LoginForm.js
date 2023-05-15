import NotifBox from './NotifBox'
import { useField } from '../utils/hooks'
import { useNotification } from '../utils/NotifContext'
import loginService from '../services/login'
import { setToken } from '../utils/requests'
import { useUserDispatch } from '../utils/UserContext'

const LoginForm = () => {
    const username = useField('text')
    const password = useField('password')
    const setNotif = useNotification()
    const dispatch = useUserDispatch()

    const removeReset = obj => {
        // eslint-disable-next-line no-unused-vars
        const { reset, ...retObj } = obj

        return retObj
    }

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const loggedUser = await loginService.login({
                username: username.value,
                password: password.value,
            })
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(loggedUser)
            )
            dispatch({ type: 'SET_USER', payload: loggedUser })
            setToken(loggedUser.token)
            username.reset()
            password.reset()
        } catch (err) {
            setNotif('Wrong Credentials', 5000)

            console.error(err)
        }
    }

    return (
        <div>
            <h2>Log-in to the Application</h2>
            <NotifBox />
            <form onSubmit={handleLogin}>
                <p>
                    Username:&nbsp;
                    <input {...removeReset(username)} />
                </p>
                <p>
                    Password:&nbsp;
                    <input {...removeReset(password)} />
                </p>
                <p>
                    <button type="submit">Log In</button>
                </p>
            </form>
        </div>
    )
}

export default LoginForm
