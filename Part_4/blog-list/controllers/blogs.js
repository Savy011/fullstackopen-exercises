const { JWT_SECRET } = require('../utils/config')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	
	response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const decodedToken = jwt.verify(request.token, JWT_SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({
			error: 'Token Invalid'
		})
	}

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		...request.body,
		user: user._id
	})

	if (!blog.likes) {
		blog.likes = 0
	}
	
	if (!blog.title || !blog.url) {
		response.status(400).send({ error: 'Missing Title or Url' })
	}

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	
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
