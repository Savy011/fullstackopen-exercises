import { Link } from 'react-router-dom'
import { useUserDispatch, useUserValue } from '../utils/UserContext'

const Menu = () => {
    const user = useUserValue()
    const dispatch = useUserDispatch()

    const style = {
        paddingRight: 5,
    }

    const handleLogout = event => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch({ type: 'CLEAR_USER' })
    }

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                <Link
                    style={style}
                    to="/"
                >
                    Blogs
                </Link>
                <Link
                    style={style}
                    to="/users"
                >
                    Users
                </Link>
                <Link
                    style={style}
                    to="/create"
                >
                    Create New
                </Link>
                Logged In as {user.name}
                &nbsp;
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Menu
