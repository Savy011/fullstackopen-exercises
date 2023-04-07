const Header = ({ name, id }) => <h2>{id}&#41; {name}</h2>

const Part = ({ name, exs }) => {
	return (
		<p><i>{name}</i> {exs}</p>
	)
}

const Content = ({ parts }) => {
	
	return (
		<>
			{parts.map((item) => {
			return <Part key={item.id} name={item.name} exs={item.exercises}/>
			})}
		</>
	)
}

const Course = ({ course }) => {
	const total = course.parts.reduce((t, p) => {
		return t + p.exercises
	}, 0)
	
	return (
		<div>
			<Header name={course.name} id={course.id}/>
			<Content parts={course.parts}/>
			<p><strong>Total Number of Exercises: {total}</strong></p>
		</div>
	)
}

export default Course
