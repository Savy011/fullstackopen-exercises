import { useState } from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
	const [ title, setTitle ] = useState('')
	const [ author, setAuthor ] = useState('')
	const [ url, setUrl ] = useState('')

	BlogForm.propTypes = {
		createBlog: propTypes.func.isRequired
	}

	const addBlog = event => {
		event.preventDefault()
		createBlog({ title, author, url })

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form onSubmit={addBlog} >
			<p>
				Title:
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="text" value={title} placeholder='Blog Title' onChange={({ target }) => setTitle(target.value)} />
			</p>
			<p>
				Author:
				&nbsp;
				<input type="text" value={author} placeholder='Blog Author' onChange={({ target }) => setAuthor(target.value)} />
			</p>
			<p>
				URL:
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="text" value={url} placeholder='Blog URL' onChange={({ target }) => setUrl(target.value)} />
			</p>
			<p><button type="submit" >Create</button></p>
		</form>
	)
}

export default BlogForm
