import { useResource, useField } from "./hooks" 

const App = () => {
    const content = useField('text')
    const name = useField('text')
    const number = useField('text')

    const [notes, noteService] = useResource('http://localhost:3005/notes')
    const [persons, personService] = useResource('http://localhost:3005/persons')

    const handleNoteSubmit = (event) => {
        event.preventDefault()
        noteService.create({ content: content.value })
        content.reset()
    }
    
    const handlePersonSubmit = (event) => {
        event.preventDefault()
        personService.create({ name: name.value, number: number.value})
        name.reset()
        number.reset()
    }

    const removeReset = obj => {
        const { reset, ...retObj } = obj
        return retObj
    }

    return (
        <div>
        <h2>notes</h2>
        <form onSubmit={handleNoteSubmit}>
            <input { ...removeReset(content) } />
            <button>Create</button>
        </form>
        <ul>
            {notes.map(n => <li key={n.id}>{n.content}</li>)}
        </ul>

        <h2>persons</h2>
        <form onSubmit={handlePersonSubmit}>
            Name: <input { ...removeReset(name) } /> <br/>
            Number: <input { ...removeReset(number) } />
            <button>Create</button>
        </form>
        {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
        </div>
    )
}

export default App