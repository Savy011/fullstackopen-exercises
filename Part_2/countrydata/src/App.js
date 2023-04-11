import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
	const [ allCountries, setAllCountries ] = useState([])
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
	
	const searchResults = allCountries.filter(item => item.name.toLowerCase().includes(search))

	const handleSearch = (event) => {
		setSearch(event.target.value)
	}

	return (
		<div>
			Search Countries:
			&nbsp;
			<input value={search} onChange={handleSearch} />
			
			{searchResults.length > 10 && <p>Too Many Results to Show, Please specify query</p>}
			{searchResults.length <10 && searchResults.length > 1 && searchResults.map(country => (<li key={country.name}>{country.name}</li>))}
			{searchResults.length === 1 && (
				<div>
					{console.log(searchResults)}
					<h2>{searchResults[0].name}&nbsp;{searchResults[0].emoji}</h2>
					<p><strong>Capital:</strong> {searchResults[0].capital}</p>
					<p><strong>Area:</strong> {searchResults[0].area} km²</p>
					<p><strong>Population:</strong> {searchResults[0].population}</p>
					<p><strong>Region:</strong> {searchResults[0].region}</p>
					<p><strong>Sub-Region:</strong> {searchResults[0].subregion}</p>
					<p><strong>Languages:</strong></p> 
					<ul>	
						{Object.values(searchResults[0].languages).map(item =>
							<li>{item}</li>
						)}
					</ul>
					<img src={searchResults[0].flags[0]} alt={searchResults[0].name} width={250}/>
				</div>
			)}
		</div>
	)
}

export default App
