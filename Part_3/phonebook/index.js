require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/mongo')

const app = express()

morgan.token('content',function getContent (req){
	return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.use(morgan(function (tokens, req, res) {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		tokens.content(req, res)
	].join(' ')
}))

app.get('/info', (request, response) => {
	const currentTime = new Date()

	response.send(`<h3>Phonebook has info for ${persons.length} people</h3>
		<h4>${currentTime}</h4>`)
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(person => {
		response.json(person)
	})
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then(person => {
		response.json(person)
	})
})

app.delete('/api/persons/:id', (request, response) => {
	Person.findByIdAndRemove(request.params.id).then(person => {
		response.status(204).end()
	})
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (body.name === undefined) {
		response.status(400).json({
			Error: 'Missing Name'
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})
	
	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
})

PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server running at Port ${PORT}`)
})
