const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtracter,
    userExtracter
} = require('./utils/middleware')

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
app.use(tokenExtracter)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', userExtracter, blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
