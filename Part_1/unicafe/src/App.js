import { useState } from "react"

const Button = ({ handleClick, text }) => {
	return (
	  <button onClick={handleClick}>
	    {text}
	  </button>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	const handleGood = () => {
		console.log('Good is clicked')
		setGood(good + 1)
	}
	
	const handleNeutral = () => {
		console.log('Neutral is clicked')
		setNeutral(neutral + 1)
	}

	const handleBad = () => {
		console.log('Bad is clicked')
		setBad(bad + 1)
	}
	
	return (
		<div>
			<h1>Give Feedback</h1>
			
			<Button handleClick={handleGood} text='Good'/>
			&nbsp;
			<Button handleClick={handleNeutral} text='Neutral'/>
			&nbsp;
			<Button handleClick={handleBad} text='Bad'/>

			<h1>Statistics</h1>
			
			<p>Good: {good}</p>
			<p>Neutral: {neutral}</p>
			<p>Bad: {bad}</p>
		</div>
	)
}

export default App;
