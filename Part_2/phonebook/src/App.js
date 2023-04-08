import { useState } from "react";

const App = () => {
	const [ contacts, setContacts ] = useState([
		{
			id: 1,
			name: 'Savy',
			number: '9876543210'
		}
	])
	const [ newPerson, setNewPerson] = useState('')
	const [ newNumber, setNewNumber] = useState('')
	
	const addContact= (event) => {
		event.preventDefault()
		const contactObject = {
			id: contacts.length + 1,
			name: newPerson,
			number: newNumber
		}
		let dupeCheck = false
		dupeCheck = contacts.find((item) => { return item.name.toLowerCase() === newPerson.toLowerCase() })

		if (dupeCheck) {
			setNewPerson('')
			setNewNumber('')
			return alert(`${newPerson} is Already in the Phonebook`)
		}
		else {
			setContacts(contacts.concat(contactObject))
			setNewPerson('')
			setNewNumber('')
		}
	}


	const handleNameChange = (event) => {
		setNewPerson(event.target.value)
	}
	
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	return (
		<div>
			<h2>PhoneBook</h2>
			<form onSubmit={addContact}>
				<p>Name: <input value={newPerson} onChange={handleNameChange}/></p>
				<p>Phone No.: <input value={newNumber} onChange={handleNumberChange}/></p>
				<div><button type='submit'>Add</button></div>
			</form>
			
			<h2>Contacts</h2>
			{contacts.map((item) => 
				<p key={item.id}>{item.name} {item.number}</p>
			)}	
		</div>
	)
}

export default App;
