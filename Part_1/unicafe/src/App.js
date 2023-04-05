import { useState } from "react"

const Button = ({ handleClick, text }) => {
	return (
	  <button onClick={handleClick}>
	    {text}
	  </button>
	)
}

const StatsDisplay = (props) => {
	return (
		<>
		<p>{props.text}: {props.value}{props.sign}</p>
		</>
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
	
	const total = good + neutral + bad
	const average = (good + bad * -1) / total
	const positive = (good / total) * 100
	
	return (
		<div>
			<h1>Give Feedback</h1>
			
			<Button handleClick={handleGood} text='Good'/>
			&nbsp;
			<Button handleClick={handleNeutral} text='Neutral'/>
			&nbsp;
			<Button handleClick={handleBad} text='Bad'/>

			<h1>Statistics</h1>
			
			<StatsDisplay text='Good' value={good} />
			<StatsDisplay text='Neutral' value={neutral} />
			<StatsDisplay text='Bad' value={bad} />
			<StatsDisplay text='Total' value={total} />
			<StatsDisplay text='Average' value={average} />
			<StatsDisplay text='Positive' value={positive} sign='%' />
		</div>
	)
}

export default App;
