import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [ blogs, setBlogs ] = useState([])
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ user, setUser ] = useState(null)
	const [ message, setMessage ] = useState('')
	const [ messageType, setMessageType ] = useState(null)
	
	const blogFormRef = useRef()

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
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async event => {
		event.preventDefault()	
		
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setMessageType('error')
			setMessage('Wrong Credentials')
			setTimeout(() => {
				setMessageType(null)
				setMessage('')
			}, 5000);
			
			console.error(exception)
		}
	}

	const handleLogout = event => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogAppUser')
		setUser(null)
	}

	const createBlog = async blogObj => {
		try {
			blogFormRef.current.toggleVisibility()
			await blogService.create(blogObj)
			await blogService.getAll().then(newBlogs => setBlogs(newBlogs))
			setMessageType('success')
			setMessage(`Blog '${blogObj.title}' by ${blogObj.author} added!`)
			setTimeout(() => {
				setMessageType(null)
				setMessage('')
			}, 5000);
		} catch (exception) {
			console.error(exception)
		}
	}
	
	const updateBlog = async blogObj => {
		try {
			await blogService.update(blogObj)
			await blogService.getAll().then(updatedBlogs => setBlogs(updatedBlogs))
		} catch (exception) {
			console.error(exception)
		}
	}

	const NotifBox = () => {
		return (
			<>
				<div className={messageType}>
					<p>{message}</p>
				</div>
			</>
		)
	}

	const loginForm = () => (
		<div>
			<h2>Log-in to the Application</h2>
			{ messageType === null ? null : <NotifBox /> }
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
			{ messageType === null ? null : <NotifBox /> }
			<p>
				Logged In as {user.name}
				&nbsp;
				<button onClick={handleLogout} >Logout</button>
			</p>
	
			<h3>Create New Blog</h3>
			<Toggleable buttonLabel='Create Blog' ref={blogFormRef} >
				<BlogForm createBlog={createBlog} />
			</Toggleable>

			<h3>Blog List</h3>
			<div>
    			{blogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />)}
			</div>

		</div>
	)

	return (
    	<div>
			{ user === null ? loginForm() : blogList() }
    	</div>
	)
}

export default App
