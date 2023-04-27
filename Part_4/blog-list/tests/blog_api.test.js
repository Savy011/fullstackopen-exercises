const mongoose = require('mongoose')
const supertest = require('supertest')
const { initialBlogs } = require('./test_helper')
const app = require ('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of initialBlogs) {
		let blogObj = new Blog(blog)
		await blogObj.save()
	}
})

test('Blogs are returned as JSON', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('All blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
	await mongoose.connection.close()
})
