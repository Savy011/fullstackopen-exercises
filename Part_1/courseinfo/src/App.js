const App = () => {
	const info = {
		course: {
			name: 'Half Stack Applicaion Development'
		},
		part: [
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


	const Header = (props) => {
		return (
			<>
				<h1>{props.course}</h1>
			</>
		)
	}
	
	const Part = (props) => {
		return (
			<>
			<p>
				{props.name} {props.exs}
			</p>
			</>
		)
	}

	const Content = () => {
		return (
			<>
				<Part name={info.part[0].name} exs={info.part[0].exercises}/>
				<Part name={info.part[1].name} exs={info.part[1].exercises}/>
				<Part name={info.part[2].name} exs={info.part[2].exercises}/>
			</>
		)
	}
	
	const Total = (props) => {
		return (
			<>
				<p>Total Number of Exercies: {props.one + props.two + props.three}</p>
			</>
		)
	}
 

	return (
		<div>
			<Header course={info.course.name} />
			<Content />
			<Total one={info.part[0].exercises} two={info.part[1].exercises} three={info.part[2].exercises}/>
		</div>
	)
}

export default App;
