import { useUserDispatch, useUserValue } from '../utils/UserContext'

const Menu = () => {
    const user = useUserValue()
    const dispatch = useUserDispatch()

    const handleLogout = event => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch({ type: 'CLEAR_USER' })
    }

    return (
        <div>
            <h2>Blogs</h2>
            <p>
                Logged In as {user.name}
                &nbsp;
                <button onClick={handleLogout}>Logout</button>
            </p>
        </div>
    )
}

export default Menu
