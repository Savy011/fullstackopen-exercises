import patients from '../../data/patients-full';

import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatientData, Patient, Entry, NewEntry } from '../types';

const getAllPatients = (): NonSensitivePatientData[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation  }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const getPatientDetails = (id: string): Patient | undefined => {
	const foundPatient = patients.find(p => p.id === id)

	return foundPatient
}

const addPatient = (patientDetails: NewPatient):Patient => {
	const newPatient = {
		id: uuid(),
		...patientDetails,
		entries: []
	};

	patients.push(newPatient);
	return newPatient;
};

const addEntry = (entry: NewEntry, patient: Patient): Entry => {
	const newEntry = {
		id: uuid(),
		...entry
	}
	
	patient.entries.push(newEntry)

	return newEntry
}

export default {
	getAllPatients,
	getPatientDetails,
	addPatient,
	addEntry
};
