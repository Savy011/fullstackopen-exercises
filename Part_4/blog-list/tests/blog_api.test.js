const mongoose = require('mongoose')
const supertest = require('supertest')
const { initialBlogs, blogsInDB } = require('./test_helper')
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

test('All blogs have a unique identifier property named \'id\'', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
	
	const retBlog = response.body[0]

	expect(retBlog.id).toBeDefined()
})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
	}
	
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	
	const blogsAtEnd = await blogsInDB()
	expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
	
	const titles = blogsAtEnd.map(n => n.title)
	expect(titles).toContain('First class tests')
})

afterAll(async () => {
	await mongoose.connection.close()
})
