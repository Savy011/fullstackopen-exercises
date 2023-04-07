const Course = ({ course }) => {
	const Header = ({ name }) => {
		return (
			<>
				<h2>{name}</h2>
			</>
		)
	}
	
	const Part = ({ name, exs }) => {
		return (
			<p>{name} {exs}</p>
		)
	}

	const Content = () => {
		return (
			<>
				{course.parts.map((part, i) => 
					<Part key={i} name={part.name} exs={part.exercises}/>
				)}
			</>
		)
	}

	const total = course.parts.reduce((p, c) => {
		return p + c.exercises
	}, 0)

	return (
		<div>
			<Header name={course.name}/>
		<Content />
		<p>Total Number of Exercises: {total}</p>
		</div>
	)
}

const App = () => {
	const course = {
		id: 1,
		name: 'Half Stack Applicaion Development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
			},
			{
				name: 'Using Props to pass Data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			},
			{
				name: 'Redux',
				exercises: 11
			}
		]
	}


	return <Course course={course}/>
}

export default App;
