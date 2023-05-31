import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAllPatients = async () => {
	const { data } = await axios.get<Patient[]>(
		`${apiBaseUrl}/patients`
	);

	return data;
};

const getPatientData = async (id: string) => {
	const { data } = await axios.get<Patient>(
		`${apiBaseUrl}/patients/${id}`
	);

	return data;
}

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(
		`${apiBaseUrl}/patients`,
		object
	);

	return data;
};

const addEntry = async (id: string, object: EntryFormValues) => {
	const { data } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${id}/entries`,
		object
	)

	return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAllPatients,
	getPatientData,
	create,
	addEntry
};

