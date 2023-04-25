const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const { requestLogger, unknownEndpoint } = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('Connecting to MongoDB...')

mongoose.connect(config.MONGODB_URL)
	.then(() => {
		logger.info('Connected to MongoDB!!!')
	}).catch((error) => {
		logger.error('Error connecting to MongoDB', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)

module.exports = app
