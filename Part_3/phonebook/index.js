const express = require('express')
const app = express()

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
		"id": 1
	}
]

app.get('/', (request, response) => {
	response.send('<h1>Herro Everynyan!!</h1>')
})

app.get('/info', (request, response) => {
	const currentTime = new Date()

	response.send(`<h3>Phonebook has info for ${persons.length} people</h3>
		<h4>${currentTime}</h4>`)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running at Port ${PORT}`)
})
