import { useEffect, useState } from "react"
import axios from "axios"

const WeatherData = ({ country }) => {
	const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
	const api_key = process.env.REACT_APP_API_KEY
	const [ temp, setTemp ] = useState('')
	const [ weather, setWeather ] = useState('')
	const [ windSpeed, setWindSpeed ] = useState('')
	const [ weatherIcon, setWeatherIcon ] = useState('')
	const city = country.capital[0].replace(/ /g,"+");

	useEffect(() => {
		console.log('Getting Data')
		axios
			.get(`${baseURL}?q=${city}&units=metric&appid=${api_key}`)
			.then(response => {
				setTemp(response.data.main.temp)
				setWeather(response.data.weather[0].main)
				setWeatherIcon(response.data.weather[0].icon)
				setWindSpeed(response.data.wind.speed)
			})
	}, [ city ])
	
	if (temp === '') {
		return <p>Loading....</p>
	}

	return (
		<div>
			<p><b>Temperature:</b> {temp} <sup>o</sup>C</p>
			<p><b>Weather:</b> {weather}</p>
			<p><b>Wind:</b> {windSpeed}m/s</p>
			<img alt={weather} src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}/>
			
		</div>
	)
}

const Details = ({ country }) => {
	if (country.length === 0) {
		return null
	}

	return (
		<div>
			<h2><u>{country.name}&nbsp;{country.emoji}</u></h2>
			<p><b>Capital:</b> {country.capital}</p>
			<p><b>Area:</b> {country.area} km²</p>
			<p><b>Population:</b> {country.population}</p>
			<p><b>Region:</b> {country.region}</p>
			<p><b>Sub-Region:</b> {country.subregion}</p>
			<p><b>Languages:</b></p> 
			<ul>	
				{Object.values(country.languages).map(item =>
					<li key={item}>{item}</li>
				)}
			</ul>
			<img src={country.flags[0]} alt={country.name} width={250}/>
		
			<h2><u>Weather in {country.capital}</u></h2>
			<WeatherData country={country} />
		</div>
	)
}

export default Details
