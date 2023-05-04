const Blog = ({ blog }) => {
	return (
		<div>
    		<p><i>{blog.title}</i> - {blog.author}</p>
		</div>
	)
}

export default Blog
