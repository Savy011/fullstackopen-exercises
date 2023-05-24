import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const BirthYearForm = ({ authors }) => {
    const [selectedAuthor, setSelectedAuthor] = useState(null)
    const [birthyear, setBirthYear] = useState('')

    const [ editAuthor ] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS }]
    }) 

    const handleSubmit = event => {
        event.preventDefault()

        editAuthor({ variables: {
            name: selectedAuthor,
            born: parseInt(birthyear)
        } })
		setSelectedAuthor('DEFAULT')
		setBirthYear('')
	}

    return (
        <div>
            <h4>Set Birthyear</h4>
            <div>
                <form onSubmit={handleSubmit}>
                <p>
                    Name:&nbsp;
                    <select required onChange={e => setSelectedAuthor(e.target.value)} defaultValue={'DEFAULT'}>
                        <option disabled value='DEFAULT'> -- Select an Author -- </option>
                        {authors.map(a => (
                            <option key={a.name} value={a.name}>{a.name}</option>
                        ))}
                    </select>
                </p>
                <p>
                    Birth Year:&nbsp;
                    <input required type="number" value={birthyear} onChange={e => setBirthYear(e.target.value)}/>
                </p>
                <p><button type="submit">Update Author</button></p>
                </form>
            </div>
        </div>
    )
}

export default BirthYearForm
