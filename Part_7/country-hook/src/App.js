import React, { useState } from 'react'
import { useField, useCountry } from './hooks'

const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (!country.found) {
        return (
        <div>
            Country Not Found...
        </div>
        )
    }

    return (
        <div>
        <h3>{country.data.name.common} </h3>
        <div>Capital: {country.data.capital}</div>
        <div>Population: {country.data.population}</div> 
        <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>  
        </div>
    )
}

const App = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
        <form onSubmit={fetch}>
            <input {...nameInput} />
            <button>Find</button>
        </form>

        <Country country={country} />
        </div>
    )
}

export default App