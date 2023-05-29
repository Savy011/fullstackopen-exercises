import { useEffect, useState } from 'react';
import diagnoseService from '../../services/diagnose';
import { Diagnose, Entry } from '../../types';
import { Typography } from '@mui/material';

const EntryData = ({ entry }: { entry: Entry }) => {
	
	const [diagnose, setDiagnose] = useState<Diagnose[] | null>(null);
	
	useEffect(() => {
		const fetchDiagnoseDetails = async () => {
			const recievedDetails = await diagnoseService.getAllDiagnose();
			setDiagnose(recievedDetails)
		}
		
		void fetchDiagnoseDetails()
	}, [])

	return (
		<>
			<Typography variant='body1'><b>{entry.date}</b> <i>{entry.description}</i></Typography>
			<ul>
				{entry.diagnosisCodes?.map(code => (
					<li key={code}><Typography variant='body2' ><b>{code}</b> {diagnose?.filter(d => d.code === code)[0].name} </Typography></li>
				))}
			</ul>
		</>
	)
}

export default EntryData
