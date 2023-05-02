const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path  :', request.path)
	logger.info('Body  :', request.body)
	logger.info('---------------------')
	next()
}

const errorHandler = (error, request, response, next) => {
	logger.error(error)

	if (error.name === 'ValidationError') {
		return response.status(400).json({
			error: error.message
		})
	}

	next(error)
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'Unknown Endpoint' })
}

module.exports = {
	errorHandler,
	unknownEndpoint,
	requestLogger
}
