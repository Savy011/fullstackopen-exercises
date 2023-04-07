const Course = ({ course }) => {
	const Header = ({ name }) => {
		console.log('Entered Header', name)
		return (
			<>
				<h2>{name}</h2>
			</>
		)
	}
	
	const Part = ({ name, exs }) => {
		console.log('Entered Part', name, exs)
		return (
			<p>{name} {exs}</p>
		)
	}

	const Content = () => {
		console.log('Entered Content')
		return (
			<>
				{course.parts.map((part) => 
					<Part key={part.id} name={part.name} exs={part.exercises}/>
				)}
			</>
		)
	}

	const total = course.parts.reduce((p, c) => {
		console.log('Entered total')
		return p + c.exercises
	}, 0)

	return (
		<div>
			<Header name={course.name}/>
			<Content />
			<p><strong>Total Number of Exercises: {total}</strong></p>
		</div>
	)
}

const App = () => {
	const courses = [ 
		{
			id: 1,
			name: 'Half Stack Applicaion Development',
			parts: [
				{
					id: 1,
					name: 'Fundamentals of React',
					exercises: 10,
				},
				{
					id: 2,
					name: 'Using Props to pass Data',
					exercises: 7
				},
				{
					id: 3,
					name: 'State of a component',
					exercises: 14
				},
				{
					id: 4,
					name: 'Redux',
					exercises: 11
				}
			]
		},
		{
			id: 2,
			name: 'Node.js',
			parts: [
				{
					id: 1,
					name: 'Routing',
					exercises: 3
				},
				{
					id: 2,
					name: 'Middlewares',
					exercises: 7
				}
			]
		}
	]


	return (
		<div>
		  <h1>Web Dev Curriculum</h1>	
		  {courses.map((course) => {
		  	return <Course key={course.id} course={course} />
		  })}
		</div>
	)
}

export default App;
