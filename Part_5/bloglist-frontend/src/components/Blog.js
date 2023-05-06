import { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
	const [ blogObj, setBlogObj ] = useState(blog)
	const [ visible, setVisible ] = useState(false)

	Blog.propTypes = {
		blog: propTypes.object.isRequired,
		user: propTypes.object.isRequired,
		updateBlog: propTypes.func.isRequired,
		deleteBlog: propTypes.func.isRequired
	}

	const showWhenVisible = { display: visible ? '' : 'none' }
	const buttonLabel = visible ? 'Hide' : 'Show'

	const likeBlog = event => {
		event.preventDefault()

		const updatedBlog = {
			...blogObj,
			likes: blogObj.likes + 1
		}

		updateBlog(updatedBlog)
		setBlogObj(updatedBlog)
	}

	const removeBlog = event => {
		event.preventDefault()
		deleteBlog(blogObj)
	}

	return (
		<div className='blog' >
			<div className='blog-title'>
				<i>{blogObj.title}</i> - {blogObj.author}
				&nbsp;
				<button onClick={() => setVisible(!visible)} >{buttonLabel}</button>
			</div>
			<div style={showWhenVisible} className='blog-details' >
				<p><b>Url:</b> {blogObj.url}</p>
				<p><b>Likes:</b> {blogObj.likes} <button onClick={likeBlog}>Like</button> </p>
				<p><b>User:</b> {blogObj.user.name}</p>
				{ user.username.toString() === blogObj.user.username.toString() ? <p><button onClick={removeBlog} >Delete</button></p> : null}
			</div>
		</div>
	)
}

export default Blog
