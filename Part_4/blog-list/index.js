require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

console.log('Connecting to MongoDB...')

const mongoUrl = process.env.MONGODB_URL

console.log('Connected to MongoDB!!!')
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

app.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).end()
		})
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`)
})
