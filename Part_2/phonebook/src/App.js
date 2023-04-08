import { useState } from "react";

const App = () => {
	const [ contacts, setContacts ] = useState([
		{ id: 1, name: 'Savy', number: '9876543210' },
		{ id: 2, name: 'Mars', number: '8247326343' },
		{ id: 3, name: 'Ally', number: '7814365174' },
		{ id: 4, name: 'Divy', number: '2467831321' },
		{ id: 5, name: 'Rory', number: '1847124678' },
		{ id: 6, name: 'Phoebe', number: '1234567890' },
		{ id: 7, name: 'Derik', number: '9876512340' },
		{ id: 8, name: 'Ruben', number: '9018273645' }
	])
	const [ newPerson, setNewPerson] = useState('')
	const [ newNumber, setNewNumber] = useState('')
	const [ searchFilter, setSearchFilter] = useState('')
	
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

		setContacts(contacts.concat(contactObject))
		setNewPerson('')
		setNewNumber('')
	}
	 const peopleToShow = searchFilter 
		? contacts.filter(item => item.name.toLowerCase().search(searchFilter.toLowerCase()) !== -1)
		: contacts

	const handleNameChange = (event) => {
		setNewPerson(event.target.value)
	}
	
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleSearchFilter = (event) => {
		setSearchFilter(event.target.value)
	}

	return (
		<div>
			<h1>PhoneBook</h1>
				<p>Search: <input value={searchFilter} onChange={handleSearchFilter}/></p>

			<h2>Add a Contact</h2>
			<form onSubmit={addContact}>
				<p>Name: <input value={newPerson} onChange={handleNameChange}/></p>
				<p>Phone No.: <input value={newNumber} onChange={handleNumberChange}/></p>
				<div><button type='submit'>Add</button></div>
			</form>
			
			<h2>Contacts</h2>
			{peopleToShow.map((item) => 
				<p key={item.id}>{item.id}&#41; {item.name} {item.number}</p>
			)}	
		</div>
	)
}

export default App;
