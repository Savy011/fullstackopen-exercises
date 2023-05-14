import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import loginService from './services/login'
import NotifContext, { useNotification } from './utils/NotifContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
    postBlog,
    getAllBlogs,
    setToken,
    putBlog,
    removeBlog,
} from './utils/requests'
import UserContext from './utils/UserContext'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [notif, notifDispatch] = useContext(NotifContext)
    const [user, userDispatch] = useContext(UserContext)

    const blogFormRef = useRef()
    const queryClient = useQueryClient()
    const setNotif = useNotification()

    const result = useQuery('blogs', getAllBlogs, { retry: 1 })
    const blogs = result.data

    const createBlogMutation = useMutation(postBlog, {
        onSuccess: newBlog => {
            const blogsList = queryClient.getQueryData('blogs')
            queryClient.invalidateQueries('blogs', blogsList.concat(newBlog))
        },
    })

    const updateBlogMutation = useMutation(putBlog, {
        onSuccess: votedBlog => {
            const prevBlogs = queryClient.getQueryData('blogs')
            const updatedBlog = prevBlogs.find(b => b.id === votedBlog.id)
            updatedBlog.votes = votedBlog.likes
            queryClient.invalidateQueries('blogs', prevBlogs)
        },
    })

    const deleteBlogMutation = useMutation(removeBlog, {
        onSuccess: deletedBlog => {
            const prevBlogs = queryClient.getQueryData('blogs')
            const filteredBlogs = prevBlogs.filter(b => b.id !== deletedBlog.id)
            queryClient.invalidateQueries('blogs', filteredBlogs)
        },
    })

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            userDispatch({ type: 'SET_USER', payload: user })
            if (user.token) {
                setToken(user.token)
            }
        }
    }, [])

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const loggedUser = await loginService.login({ username, password })
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(loggedUser)
            )
            userDispatch({ type: 'SET_USER', payload: loggedUser })
            setToken(loggedUser.token)
            setUsername('')
            setPassword('')
        } catch (err) {
            setNotif('Wrong Credentials', 5000)

            console.error(err)
        }
    }

    const handleLogout = event => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        userDispatch({ type: 'CLEAR_USER' })
    }

    const createBlog = async blogObj => {
        blogFormRef.current.toggleVisibility()

        try {
            createBlogMutation.mutateAsync(blogObj)
            setNotif(
                `Blog '${blogObj.title}' by ${blogObj.author} added!`,
                5000
            )
        } catch (err) {
            setNotif(`Error occured while creating '${blogObj.title}'`, 5000)
            console.error(err)
        }
    }

    const updateBlog = async blogObj => {
        try {
            updateBlogMutation.mutateAsync(blogObj)
            setNotif(`Liked '${blogObj.title}' by ${blogObj.author}`, 5000)
        } catch (err) {
            setNotif(`Error occured while updating '${blogObj.title}'`, 5000)
            console.error(err)
        }
    }

    const deleteBlog = async blogObj => {
        try {
            const confirmation = window.confirm(`Delete ${blogObj.title}?`)

            if (confirmation) {
                deleteBlogMutation.mutateAsync(blogObj)
                setNotif(
                    `Deleted '${blogObj.title}' by ${blogObj.author}`,
                    5000
                )
            }
            setNotif('Deletition Cancelled', 5000)
        } catch (err) {
            setNotif(`Error occured while Deleting '${blogObj.title}'`, 5000)
            console.log(err)
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
                    .map(blog => (
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

    if (result.isLoading) {
        return <div>Loading Data...</div>
    }

    if (result.isError) {
        return <div>Error Connecting to Blogs Backend</div>
    }

    return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
