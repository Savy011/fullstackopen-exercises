import { useState } from "react";

const Heading = ({ text }) => {
	return (
		<>
			<h2>{text}</h2>
		</>
	)
}

const AnecMostVoted = ({ anecdotes, votes }) => {
	const highestVote = Math.max(...votes)
	const highestVotedIndex = votes.indexOf(highestVote);
	const hightestAnecdote = anecdotes[highestVotedIndex]
	
	if (highestVote === 0 ) {
		return (
			<p>No Votes Available</p>
		)
	}

	return (
		<div>
			<p>{hightestAnecdote}</p>
			Highest Number of Votes: {highestVote}
		</div>
	)
}

const App = () => {
	const anecdotes = [
		'If It Hurts, Do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.'
	]

	const [ selected, setSelected ] = useState(0)
	const [ votes, setVotes ] = useState(Array(8).fill(0))
	
	const handleClick = () => {
		let rn = Math.floor(Math.random() * (7 + 1))
		setSelected(rn)
	}
	
	const handleVote = () => {
		const updatedVotes = [...votes]
		updatedVotes[selected] += 1
		console.log(updatedVotes)
		setVotes(updatedVotes)
	}

	return (
		<div>
			<Heading text='Anecdotes of the Day' />
			<p>
				{anecdotes[selected]}
			</p>
			<p>
				No. of Votes: {votes[selected]}
			</p>
			<button onClick={handleVote}>Vote</button>
			&nbsp;
			<button onClick={handleClick}>Next Anecdote</button>
			
			<Heading text='Anecdote with Most Votes' />
			<AnecMostVoted anecdotes={anecdotes} votes={votes} />
		</div>
	)
}
export default App;
