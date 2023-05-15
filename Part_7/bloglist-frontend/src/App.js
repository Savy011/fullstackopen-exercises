import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import NotifBox from './components/NotifBox'
import { useQuery } from 'react-query'
import { getAllBlogs, setToken } from './utils/requests'
import UserContext from './utils/UserContext'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import Loading from './components/Loading'
import Error from './components/Error'
import Users from './components/Users'

const App = () => {
    const [user, userDispatch] = useContext(UserContext)

    const result = useQuery('blogs', getAllBlogs, { retry: 1 })
    const blogs = result.data

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

    const Blogs = () => {
        return (
            <div>
                <h2>Blog List</h2>
                {result.isLoading ? (
                    <Loading />
                ) : result.isError ? (
                    <Error />
                ) : (
                    <BlogList blogs={blogs} />
                )}
            </div>
        )
    }

    if (user === null) return <LoginForm />

    return (
        <Router>
            <Menu />
            <NotifBox />

            <Routes>
                <Route
                    path="/"
                    element={<Blogs />}
                />
                <Route
                    path="/users"
                    element={<Users />}
                />
                <Route
                    path="/create"
                    element={<BlogForm />}
                />
            </Routes>
        </Router>
    )
}

export default App
