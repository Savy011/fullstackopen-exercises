import express from 'express';
import patientService from '../services/PatientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	return res.send(patientService.getAllPatients());
});

router.post('/', (req, res) => {
	try {
		const newPatientDetails = toNewPatient(req.body);

		const addedPatient = patientService.addPatient(newPatientDetails);
		return res.json(addedPatient);
	} catch (error) {
		let errorMessage = 'Something Went Wrong';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}

		return res.status(400).send(errorMessage);
	}
});

router.get('/:id', (req, res) => {
	const id = req.params.id
	const foundPatient = patientService.getPatientDetails(id)

	if (!foundPatient) {
		return res.status(404).json({ error: 'Patient Not Found' })
	}

	return res.status(200).json(foundPatient)
})

export default router;
