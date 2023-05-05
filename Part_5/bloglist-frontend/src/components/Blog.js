import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
	const [ blogObj, setBlogObj ] = useState(blog)
	const [ visible, setVisible ] = useState(false)
	
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

	return (
		<div className="blog" >
    		<div>
				<i>{blogObj.title}</i> - {blogObj.author}
				&nbsp;
				<button onClick={() => setVisible(!visible)} >{buttonLabel}</button>
			</div>
			<div style={showWhenVisible} >
				<p><b>Url:</b> {blogObj.url}</p>
				<p><b>Likes:</b> {blogObj.likes} <button onClick={likeBlog} > 👍 </button> </p>
				<p><b>User:</b> {blogObj.user.name}</p>
			</div>
		</div>
	)
}

export default Blog
