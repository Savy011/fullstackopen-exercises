const Details = ({ country }) => {
	if (country.length === 0) {
		return null
	}

	return (
		<div>
			<h2>{country.name}&nbsp;{country.emoji}</h2>
			<p><strong>Capital:</strong> {country.capital}</p>
			<p><strong>Area:</strong> {country.area} km²</p>
			<p><strong>Population:</strong> {country.population}</p>
			<p><strong>Region:</strong> {country.region}</p>
			<p><strong>Sub-Region:</strong> {country.subregion}</p>
			<p><strong>Languages:</strong></p> 
			<ul>	
				{Object.values(country.languages).map(item =>
					<li key={item}>{item}</li>
				)}
			</ul>
			<img src={country.flags[0]} alt={country.name} width={250}/>
		</div>
	)
}

export default Details
