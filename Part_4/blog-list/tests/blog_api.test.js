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

describe('When there are some Blogs saved initially', () => {
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
})

describe('Addition of a Blog', () => {
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

	test('A blog posted with no likes property has 0 likes by default', async () => {
		const newBlog = {
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		}
		
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const blogsAtEnd = await blogsInDB()
		expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
		
		const addedBlog = blogsAtEnd.find(b => b.title === 'Canonical string reduction')
		expect(addedBlog.likes).toBe(0)
	})

	test('A blog posted with no title property returns Status Code 400', async () => {
		const newBlog = {
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		}
		
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})

	test('A blog posted with no url property returns Status Code 400', async () => {
		const newBlog = {
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
		}
		
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
})

describe('Deletion of a Blog', () => {
	test('A blog can be deleted', async () => {
		const newBlog = {
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		}
		
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const blogsBeforeDelete = await blogsInDB()
		expect(blogsBeforeDelete).toHaveLength(initialBlogs.length + 1)
		
		const blogToBeDeleted = blogsBeforeDelete.find(b => b.title === 'Canonical string reduction')
		
		await api
			.delete(`/api/blogs/${blogToBeDeleted.id}`)
			.expect(204)

		const blogsInEnd = await blogsInDB()
		expect(blogsInEnd).toHaveLength(blogsBeforeDelete.length - 1)

	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
