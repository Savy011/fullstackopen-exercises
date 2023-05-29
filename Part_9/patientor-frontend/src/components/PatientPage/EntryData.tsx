import { useEffect, useState } from 'react';
import diagnoseService from '../../services/diagnose';
import { Diagnose, Entry } from '../../types';
import { Typography } from '@mui/material';
import DiagnosisIcon from './DiagnosisIcon';

const EntryData = ({ entry }: { entry: Entry }) => {
	const [diagnose, setDiagnose] = useState<Diagnose[] | null>(null);
	
	const style: React.CSSProperties = {
		border: 'solid',
		borderColor: '#000a',
		borderRadius: 10,
		padding: 7,
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 5,
	}
		
	useEffect(() => {
		const fetchDiagnoseDetails = async () => {
			const recievedDetails = await diagnoseService.getAllDiagnose();
			setDiagnose(recievedDetails)
		}
		
		void fetchDiagnoseDetails()
	}, [])

	return (
		<div style={style}>
			<Typography variant='body1'><b>{entry.date}</b> <DiagnosisIcon entry={entry} /></Typography>
			<Typography variant='subtitle1'><i>{entry.description}</i></Typography>
			<ul>
				{entry.diagnosisCodes?.map(code => (
					<li key={code}><Typography variant='body2' ><b>{code}</b> {diagnose?.filter(d => d.code === code)[0].name} </Typography></li>
				))}
			</ul>
			<Typography variant='subtitle2'>Diagnose By: <i>{entry.specialist}</i></Typography>
		</div>
	)
}

export default EntryData
