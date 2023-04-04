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

	const Content = (props) => {
		return (
			<>
				<p>
					{props.name1} {props.exs1}
				</p>
				<p>
					{props.name2} {props.exs2}
				</p>
				<p>
					{props.name3} {props.exs3}
				</p>
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
			<Content name1={info.part.one.name} exs1={info.part.one.exercise} name2={info.part.two.name} exs2={info.part.two.exercise} name3={info.part.three.name} exs3={info.part.three.exercise}/>
			<Total one={info.part.one.exercise} two={info.part.two.exercise} three={info.part.three.exercise}/>
		</div>
	)
}

export default App;
