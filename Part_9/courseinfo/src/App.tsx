interface CoursePart {
	name: string;
	exerciseCount: number;
}

const Header = ({ courseName }: { courseName: string }): JSX.Element => {
	return <h1>{courseName}</h1>;
};

const Content = ({ coursePart }: { coursePart: CoursePart }) => {
	return <p>{coursePart.name} {coursePart.exerciseCount}</p>;
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<p>
			Number of Exercises:{" "}
			{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
		</p>
	);
};

const App = () => {
	const courseName = "Half Stack Application Development";
	const courseParts: CoursePart[] = [
		{
			name: "Fundamentals",
			exerciseCount: 10
		},
		{
			name: "Using Props to Pass Data",
			exerciseCount: 7
		},
		{
			name: "Deeper Type Usage",
			exerciseCount: 14
		}
	];
	
	return (
		<div>
			<Header courseName={courseName}/>
			{courseParts.map(coursePart => (
				<Content key={coursePart.name} coursePart={coursePart} />
			))}
			<Total courseParts={courseParts} />
		</div>
	)
};

export default App;
