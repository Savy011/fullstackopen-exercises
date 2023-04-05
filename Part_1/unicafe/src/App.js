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
		<tr>
			<td>{props.text}</td> 
			<td>{props.value}{props.sign}</td>
		</tr>
	)
}

const Stats = (props) => {
	if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
		return (
			<p>No Feedback Given</p>
		)
	}

	return (
		<table>
			<StatsDisplay text='Good' value={props.good} />
			<StatsDisplay text='Neutral' value={props.neutral} />
			<StatsDisplay text='Bad' value={props.bad} />
			<StatsDisplay text='Total' value={props.total} />
			<StatsDisplay text='Average' value={props.average} />
			<StatsDisplay text='Positive' value={props.positive} sign='%'/>
		</table>
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
			
			<Stats good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
			</div>
	)
}

export default App;
