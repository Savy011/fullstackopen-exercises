import Course from "./components/Course"

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

const App = () => {
	return (
		<div>
		  <h1><u>Web Dev Curriculum</u></h1>	
		  {courses.map((course) => {
			return <Course key={course.id} course={course} />
		  })}
		</div>
	)
}

export default App;
