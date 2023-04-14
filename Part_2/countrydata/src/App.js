import { useState, useEffect } from "react"
import axios from "axios"
import Details from "./components/Details"

const App = () => {
	const [ allCountries, setAllCountries ] = useState([])
	const [ displayCountry, setDisplayCountry ] = useState([])
	const [ display, setDisplay ] = useState(false)
	const [ search, setSearch ] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3/all')
			.then(response => {
				setAllCountries(response.data.map( ({ name, capital, population, area, region, subregion, languages, flag, flags }) => ({
					name: name.common, emoji: flag, capital, population, area, region, subregion, languages, flags
				})))
			})
	}, [])
	
	const searchResults = allCountries.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

	const handleSearch = (event) => {
		setSearch(event.target.value)
		setDisplay(false)
	}

	const handleClick = (country) => {
		setDisplayCountry(country)
		setDisplay(true)
	}

	return (
		<div>
			Search Countries:
			&nbsp;
			<input value={search} onChange={handleSearch} />
			
			<br />

			{searchResults.length > 10 && <p>Too Many Results to Show, Please specify query</p>}
			{searchResults.length < 10 && searchResults.length > 1 && searchResults.map(country => (
				<div>
				<li key={country.name}>
					{country.name}
					&nbsp;
					<button onClick={() => handleClick(country)}>Show</button>
				</li>
				</div>
			))}
			{searchResults.length === 1 && (
				<div>
					<Details country={searchResults[0]} />
				</div>
			)}
	
			{ display ? (displayCountry.length !== 0 ? <Details country={displayCountry}/> : null) : null} 

		</div>
	)
}

export default App
