const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})

	response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	const saltRounds = 11
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const newUser = new User({
		username,
		name,
		passwordHash
	})

	const savedUser = newUser.save()

	response.status(201).json(newUser)
})

module.exports = usersRouter
