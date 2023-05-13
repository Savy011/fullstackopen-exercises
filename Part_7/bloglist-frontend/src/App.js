import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import NotifContext from './utils/NotifContext'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notif, dispatch] = useContext(NotifContext)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch({ type: 'SET', payload: 'Wrong Credentials' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)

            console.error(exception)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const createBlog = async (blogObj) => {
        try {
            blogFormRef.current.toggleVisibility()
            await blogService.create(blogObj)
            await blogService.getAll().then((newBlogs) => setBlogs(newBlogs))
            dispatch({
                type: 'SET',
                payload: `Blog '${blogObj.title}' by ${blogObj.author} added!`,
            })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)
        } catch (exception) {
            dispatch({
                type: 'SET',
                payload: `Error occured while creating '${blogObj.title}'`,
            })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)
            console.error(exception)
        }
    }

    const updateBlog = async (blogObj) => {
        try {
            await blogService.update(blogObj)
            await blogService
                .getAll()
                .then((updatedBlogs) => setBlogs(updatedBlogs))
            dispatch({
                type: 'SET',
                payload: `Liked '${blogObj.title}' by ${blogObj.author}`,
            })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)
        } catch (exception) {
            dispatch({
                type: 'SET',
                payload: `Error occured while updating '${blogObj.title}'`,
            })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)
            console.error(exception)
        }
    }

    const deleteBlog = async (blogObj) => {
        try {
            const confirmation = window.confirm(`Delete ${blogObj.title}`)
            if (confirmation) {
                await blogService.remove(blogObj)
                await blogService
                    .getAll()
                    .then((updatedBlogs) => setBlogs(updatedBlogs))
            }
            dispatch({
                type: 'SET',
                payload: `Deleted '${blogObj.title}' by ${blogObj.author}`,
            })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)
        } catch (exception) {
            dispatch({
                type: 'SET',
                payload: `Error occured while deleting '${blogObj.title}'`,
            })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)
            console.error(exception)
        }
    }

    const NotifBox = () => {
        const style = {
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            border: 'solid',
            borderRadius: 10,
            fontFamily: 'monospace',
            fontSize: 18,
        }

        return (
            <>
                <div style={style}>
                    <p>{notif}</p>
                </div>
            </>
        )
    }

    const loginForm = () => (
        <div>
            <h2>Log-in to the Application</h2>
            {notif === '' ? null : <NotifBox />}
            <form
                onSubmit={handleLogin}
                id="login-form"
            >
                <p>
                    Username: &nbsp;
                    <input
                        type="text"
                        name="Username"
                        id="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </p>
                <p>
                    Password: &nbsp;
                    <input
                        type="password"
                        name="Password"
                        id="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </p>
                <button
                    id="login-button"
                    type="submit"
                >
                    Log-in
                </button>
            </form>
        </div>
    )

    const blogList = () => (
        <div>
            <h2>Blogs</h2>
            {notif === '' ? null : <NotifBox />}
            <p>
                Logged In as {user.name}
                &nbsp;
                <button
                    id="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </p>

            <h4>Create New Blog</h4>
            <Toggleable
                buttonLabel="Create Blog"
                ref={blogFormRef}
            >
                <BlogForm createBlog={createBlog} />
            </Toggleable>

            <h3>Blog List</h3>
            <div>
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            updateBlog={updateBlog}
                            deleteBlog={deleteBlog}
                        />
                    ))}
            </div>
        </div>
    )

    return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
