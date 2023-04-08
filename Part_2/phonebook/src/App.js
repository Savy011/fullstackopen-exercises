import { useState } from "react";

const App = () => {
	const [ persons, setPersons ] = useState([
		{
			id: 1,
			name: 'Savy'
		}
	])
	const [ newPerson, setNewPerson] = useState('')
	
	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			id: persons.length + 1,
			name: newPerson
		}
		let dupeCheck = false
		dupeCheck = persons.find((item) => { return item.name.toLowerCase() === newPerson.toLowerCase() })

		if (dupeCheck) {
			setNewPerson('')
			return alert(`${newPerson} is Already in the Phonebook`)
		}
		else {
			setPersons(persons.concat(personObject))
			setNewPerson('')
		}
	}


	const handleChange = (event) => {
		setNewPerson(event.target.value)
	}
	
	return (
		<div>
			<h2>PhoneBook</h2>
			<form onSubmit={addPerson}>
				<div>Name: <input value={newPerson} onChange={handleChange}/></div>
				<div><button type='submit'>Add</button></div>
			</form>
			
			<h2>Contacts</h2>
			{persons.map((item, i) => 
				<p key={i}>{item.name}</p>
			)}	
		</div>
	)
}

export default App;
