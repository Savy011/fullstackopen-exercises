const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please Enter Database password')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://notes-app:${password}@notes-app.fsqoimy.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] === undefined ) {
	console.log('Phonebook Contacts:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
})
} else {
	const personName = process.argv[3]
	const personNumber = process.argv[4]

	const person = new Person({
		name: personName,
		number: personNumber,
	})

	person.save().then(result => {
		console.log(`Added to PhoneBook Database\nName: ${personName}\nNumber: ${personNumber}`)
		mongoose.connection.close()
	})
}
