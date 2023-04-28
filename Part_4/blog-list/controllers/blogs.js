const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	
	if (!blog.likes) {
		blog.likes = 0
	}
	
	if (!blog.title || !blog.url) {
		response.status(400).send({ error: 'Missing Title or Url' })
	}

	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const { likes } = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, context: 'query' })
	response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
