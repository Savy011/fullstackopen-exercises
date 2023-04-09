import { useEffect, useState } from "react";
import Content from "./components/Content";
import Filter from "./components/Filter";
import ContactForm from "./components/Form";
import contactServices from "./services/contacts"

const App = () => {
	const [ contacts, setContacts ] = useState([])
	const [ newPerson, setNewPerson] = useState('')
	const [ newNumber, setNewNumber] = useState('')
	const [ searchFilter, setSearchFilter] = useState('')

	const hook = () => {
		contactServices
			.getAll()
			.then(allContacts => {
				setContacts(allContacts)
			})
	}

	useEffect(hook, [])

	const addContact= (event) => {
		event.preventDefault()
		const contactObject = {
			name: newPerson,
			number: newNumber
		}
		
		const existingCheck = contacts.filter(item => item.name.toLowerCase().trim() === newPerson.toLowerCase().trim())
		
		if (existingCheck.length > 0) {
			const confirmation = window.confirm(`${newPerson} Already Exists...\nUpdate their Number?`)
			
			const existingContact = existingCheck[0]

			if (confirmation) {
				const updatedContact = { ...existingContact, number: newNumber }

				contactServices
					.update(updatedContact.id, updatedContact)
					.then(response => {
						setContacts(contacts.map(item => item.id !== response.id ? item : response))
						setNewPerson('')
						setNewNumber('')
					})
			}
		} else {
			contactServices
				.add(contactObject)
				.then(newContact => {
					setContacts(contacts.concat(newContact))
					setNewPerson('')
					setNewNumber('')
				})
		}
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
	
	const handleDelete = (id) => {
		const removePerson = contacts.find(item => item.id === id)

		if (window.confirm(`Delete Contact for ${removePerson.name}`)) {
			contactServices
				.obliterate(id)
				.then(response => {
					setContacts(contacts.filter(item => item.id !== id))
				})
		}
	}
	
	return (
		<div>
			<h1>PhoneBook</h1>
			<Filter searchFilter={searchFilter} handleSearchFilter={handleSearchFilter}/>

			<h2>Add a Contact</h2>
			<ContactForm addContact={addContact} newPerson={newPerson} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />	
			
			<h2>Contacts</h2>
			<Content peopleToShow={peopleToShow} handleDelete={handleDelete}/>
		</div>
	)
}

export default App;
