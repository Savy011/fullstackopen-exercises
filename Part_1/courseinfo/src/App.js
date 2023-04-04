const App = () => {
	const info = {
		course: {
			name: 'Half Stack Applicaion Development'
		},
		part: {
			one: {
				name: 'Fundamentals of React',
				exercise: 10,
			},
			two: {
				name: 'Using Props to pass Data',
				exercise: 7
			},
			three: {
				name: 'State of a component',
				exercise: 14
			}
		}
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
				<Part name={info.part.one.name} exs={info.part.one.exercise}/>
				<Part name={info.part.two.name} exs={info.part.two.exercise}/>
				<Part name={info.part.three.name} exs={info.part.three.exercise}/>
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
			<Total one={info.part.one.exercise} two={info.part.two.exercise} three={info.part.three.exercise}/>
		</div>
	)
}

export default App;
