const Course = ({ course }) => {
	const Header = ({ name }) => {
		return (
			<>
				<h1>{name}</h1>
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
				{course.parts.map((part) => 
					<Part name={part.name} exs={part.exercises}/>
				)}
			</>
		)
	}
	return (
		<div>
			<Header name={course.name}/>
		<Content />
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
			}
		]
	}


	return <Course course={course}/>
}

export default App;
