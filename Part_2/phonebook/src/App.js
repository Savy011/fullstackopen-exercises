import axios from "axios";
import { useEffect, useState } from "react";
import Content from "./components/Content";
import Filter from "./components/Filter";
import ContactForm from "./components/Form";

const App = () => {
	const [ contacts, setContacts ] = useState([])
	const [ newPerson, setNewPerson] = useState('')
	const [ newNumber, setNewNumber] = useState('')
	const [ searchFilter, setSearchFilter] = useState('')
	
	const hook = () => {
		axios
			.get('http://localhost:3001/contacts')
			.then(response => {
				setContacts(response.data)
			})
	}

	useEffect(hook, [])

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
			<Filter searchFilter={searchFilter} handleSearchFilter={handleSearchFilter}/>

			<h2>Add a Contact</h2>
			<ContactForm addContact={addContact} newPerson={newPerson} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />	
			
			<h2>Contacts</h2>
			<Content peopleToShow={peopleToShow}/>
		</div>
	)
}

export default App;
