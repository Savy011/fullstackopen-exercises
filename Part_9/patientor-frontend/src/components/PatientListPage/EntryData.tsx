import { Entry } from '../../types';
import { Typography } from '@mui/material';

const EntryData = ({ entry }: { entry: Entry }) => {
	return (
		<>
			<Typography variant='body1'><b>{entry.date}</b> <i>{entry.description}</i></Typography>
			<ul>
				{entry.diagnosisCodes?.map(code => (
					<li key={code}><Typography variant='body2' >{code}</Typography></li>
				))}
			</ul>
		</>
	)
}

export default EntryData
