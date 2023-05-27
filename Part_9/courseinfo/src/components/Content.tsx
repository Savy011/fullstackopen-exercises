import Part from './Part';
import { CoursePart } from '../types';

const Content = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
	return (
		<div>
			{courseParts.map(coursePart => (
				<Part key={coursePart.name} coursePart={coursePart} />
			))}
		</div>
	);
};

export default Content
