import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { CoursePart } from './types';

const App = (): JSX.Element => {
	const courseName = "Half Stack Application Development";
	const courseParts: CoursePart[] = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
			description: "This is an awesome course part",
			kind: "base"
		},
		{
			name: "Using Props to Pass Data",
			exerciseCount: 7,
			groupProjectCount: 3,
			kind: "group"
		},
		{
			name: "Basics of Type Narrowing",
			exerciseCount: 7,
			description: "How to go from unknown to string",
			kind: "base"
		},
		{
			name: "Deeper Type Usage",
			exerciseCount: 14,
			description: "Confusing Description",
			backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
			kind: "background"
		},
		{
			name: "Typescript in Frontend",
			exerciseCount: 10,
			description: "A Hard Part",
			kind: "base"
		},
		{
			name: "Backend Development",
			exerciseCount: 21,
			description: "Typing the backend",
			requirements: ["nodejs", "jest"],
			kind: "special"
		}
	];
	
	return (
		<div>
			<Header courseName={courseName}/>
			<Content courseParts={courseParts}/>
			<Total courseParts={courseParts} />
		</div>
	)
};

export default App;
