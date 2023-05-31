import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GenderIcon from './GenderIcon';
import EntryData from './EntryData';
import patientService from '../../services/patients';
import { Entry, EntryFormValues, Patient } from '../../types';
import AddEntryModal from '../AddEntryModal';

const PatientPage = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const [patient, setPatient] = useState<Patient | null>(null);
	const [entries, setEntries] = useState<Entry[]>([]);
	const id = useParams().id;
	
	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};
	
	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			const entry = await patientService.addEntry(id as string, values);
			setEntries(entries.concat(entry));
			setModalOpen(false);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === "string") {
					const message = e.response.data.replace('Something went wrong. Error: ', '');
					console.error(message);
					setError(message);
				} else {
					setError("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	}

	useEffect(() => {
		const fetchPatientDetails = async () => {
			const recievedDetails = await patientService.getPatientData(id as string);
			setPatient(recievedDetails);
			setEntries(recievedDetails.entries)
		}
		
		void fetchPatientDetails()
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
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant='h4' style={{ marginTop: 15, marginBottom: 15 }}>Entries</Typography>
				<Button
					variant='contained'
					size='small'
					onClick={() => openModal()}
					style={{ display: 'flex', alignItems: 'center' , maxHeight:'7vh' }}
				>
					Add Entry
				</Button>
			</div>
			<AddEntryModal
				modalOpen={modalOpen}
				onClose={closeModal}
				error={error}
				onSubmit={submitNewEntry}
			/>
			{patient.entries.length !== 0 ? (entries.map(entry => (
				<EntryData key={entry.id} entry={entry} />
			))) : (<Typography variant='h6'>No Entries Available for Patient...</Typography>)}
		</div>
	)

}

export default PatientPage
