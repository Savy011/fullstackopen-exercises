import { Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../../constants';
import { Patient } from '../../types';
import { Female, Male, Transgender } from '@mui/icons-material';
import { Gender } from '../../types';

const GenderIcon = ({ gender }: { gender: Gender}): JSX.Element | null => {
	if (gender === Gender.Male) {
		return <Male fontSize='large' />
	} else if (gender === Gender.Female) {
		return <Female fontSize='large' />
	} else if (gender === Gender.Other) {
		return <Transgender fontSize='large' />
	} else {
		return null
	}
}

const PatientPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null)
	const id = useParams().id
	
	useEffect(() => {
		axios.get(`${apiBaseUrl}/patients/${id}`).then(patient => {
			setPatient(patient?.data)
		})
	}, [id])
		
	if (!patient) return <div>Loading...</div>
	
	return (
		<div>
			<Typography variant='h3'>{patient.name} <GenderIcon gender={patient.gender} /></Typography>
			<Typography variant='subtitle1'><b>Date of Birth:</b> {patient.dateOfBirth}</Typography>
			<Typography variant='subtitle1'><b>SSN:</b> {patient.ssn}</Typography>
			<Typography variant='subtitle1'><b>Occupation:</b> {patient.occupation}</Typography>
		</div>
	)

}

export default PatientPage
