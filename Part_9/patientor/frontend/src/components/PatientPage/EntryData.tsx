import { useEffect, useState } from 'react';
import diagnoseService from '../../services/diagnose';
import { Diagnose, Entry, EntryType } from '../../types';
import { Typography } from '@mui/material';
import DiagnosisIcon from './DiagnosisIcon';
import HealthRatingBar from '../HealthRatingBar';

const EntrySpecificData = ({ entry }: { entry: Entry }) => {
	switch (entry.type) {
		case EntryType.Hospital:
			return (<>
				<Typography variant='body2'>
					Discharge Date: {entry.discharge.date}
				</Typography>
				<Typography variant='body2'>
					Discharge Criteria: {entry.discharge.criteria}
				</Typography>
			</>)
		case EntryType.OccupationalHealthcare:
			return (<>
					<Typography variant='body2'>
						Employer Name: {entry.employerName}
					</Typography>
					{entry.sickLeave ? (<Typography variant='body2'>
						Sick Leave Duration: from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}
						</Typography>)
						: null}
			</>)
		case EntryType.HealthCheck:
			return (<>
				<HealthRatingBar rating={entry.healthCheckRating} showText={true} />
			</>)
		default:
			return null
	}
}

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
			<EntrySpecificData entry={entry}/>
			<Typography variant='subtitle2'>Diagnose By: <i>{entry.specialist}</i></Typography>
		</div>
	)
}

export default EntryData
