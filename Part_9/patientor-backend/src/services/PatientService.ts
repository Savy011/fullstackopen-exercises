import patients from '../../data/patients';

import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatientData, Patient } from '../types';

const getAllPatients = (): NonSensitivePatientData[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation  }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (patientDetails: NewPatient):Patient => {
	const newPatient = {
		id: uuid(),
		...patientDetails
	};

	patients.push(newPatient);
	return newPatient;
};

export default {
	getAllPatients,
	addPatient
};
