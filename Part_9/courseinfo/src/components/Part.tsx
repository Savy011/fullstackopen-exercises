import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
	switch(coursePart.kind) {
		case "base":
			return (
				<div>
					<p><b>{coursePart.name} ({coursePart.exerciseCount})</b></p>
					<p><i>{coursePart.description}</i></p>
				</div>
			)
		case "group":
			return (
				<div>
					<p><b>{coursePart.name} ({coursePart.exerciseCount})</b></p>
					<p>Group Execises: <i>{coursePart.groupProjectCount}</i></p>
				</div>
			)
		case "background":
			return (
				<div>
					<p><b>{coursePart.name} ({coursePart.exerciseCount})</b></p>
					<p><i>{coursePart.description}</i></p>
					<p>Submit To: <i>{coursePart.backgroundMaterial}</i></p>
				</div>
			);
		case "special":
			return (
				<div>
					<p><b>{coursePart.name} ({coursePart.exerciseCount})</b></p>
					<p><i>{coursePart.description}</i></p>
					<p>Requirements: <i>{coursePart.requirements.join(', ')}</i></p>
				</div>
			);
		default:
			return assertNever(coursePart)
	}
};

export default Part
