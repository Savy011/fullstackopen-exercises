import { Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenderIcon from '../PatientListPage/GenderIcon';
import EntryData from '../PatientListPage/EntryData';
import { apiBaseUrl } from '../../constants';
import { Patient } from '../../types';

const PatientPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null)
	const id = useParams().id
	
	useEffect(() => {
		axios.get(`${apiBaseUrl}/patients/${id}`).then(patient => {
			setPatient(patient?.data)
			console.log(patient?.data)
		})
	}, [id])
		
	if (!patient) return <div>Loading...</div>
	
	return (
		<div>
			<Typography variant='h3' style={{ marginTop: 15, marginBottom: 15 }}>
				{patient.name} <GenderIcon gender={patient.gender} />
			</Typography>
			<Typography variant='subtitle1'>
				<b>Date of Birth:</b> {patient.dateOfBirth}
			</Typography>
			<Typography variant='subtitle1'>
				<b>SSN:</b> {patient.ssn}
			</Typography>
			<Typography variant='subtitle1'>
				<b>Occupation:</b> {patient.occupation}
			</Typography>
			<Typography variant='h4' style={{ marginTop: 15, marginBottom: 15 }}>Entries</Typography>
			{patient.entries.length !== 0 ? (patient.entries.map(entry => (
				<EntryData key={entry.id} entry={entry} />
			))) : (<Typography variant='h6'>No Entries Available for Patient...</Typography>)}
		</div>
	)

}

export default PatientPage
