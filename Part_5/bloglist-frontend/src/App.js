import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [ blogs, setBlogs ] = useState([])
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ user, setUser ] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs(blogs)
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
	}, [])

	const handleLogin = async event => {
		event.preventDefault()	
		
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			console.error(exception)
		}
	}

	const handleLogout = event => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogAppUser')
		setUser(null)
	}
	
	const loginForm = () => (
<div>
				<h2>Log-in to the Application</h2>
				<form onSubmit={handleLogin}>
					<p>
						Username:
						&nbsp;
						<input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
					</p>
					<p>
						Password:
						&nbsp;
						<input type="password" name="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
					</p>
					<button type="submit" >Log-in</button>
				</form>
			</div>

	)
	
	const blogList = () => (
    	<div>	
			<h2>Blogs</h2>
			<p>
				Logged In as {user.name}
				&nbsp;
				<button onClick={handleLogout} >Logout</button>
			</p>
    		{blogs.map(blog =>
    			<Blog key={blog.id} blog={blog} />
    		)}
		</div>
	)

	return (
    	<div>
			{ user === null ? loginForm() : blogList() }

    	</div>
	)
}

export default App
