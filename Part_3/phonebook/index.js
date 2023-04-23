const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('content',function getContent (req){
	return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('build'))

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

let persons = [
	{
		"name": "Arto Hellas",
		"number": "040-123456",
		"id": 1
	},
	{
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	},
	{
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	},
	{
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	}
]

const generateId = () => {
	const genId = Math.floor(Math.random() * 500)

	return genId
}

app.get('/info', (request, response) => {
	const currentTime = new Date()

	response.send(`<h3>Phonebook has info for ${persons.length} people</h3>
		<h4>${currentTime}</h4>`)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(item => item.id === id)
	
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(item =>  item.id !== id)

	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name) {
		response.status(400).json({
			Error: 'Missing Name'
		})
	}
	

	const person = {
		name: body.name,
		number: body.number,
		id: generateId()
	}
	
	const dupeCheck = persons.filter(item => item.name.toLowerCase() === person.name.toLowerCase())

	if (dupeCheck.length > 0) {
		response.status(400).json({
			Error: 'Name must be Unique'
		})
	} else {
		persons = persons.concat(person)
		response.json(person)
	}
})

PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server running at Port ${PORT}`)
})
