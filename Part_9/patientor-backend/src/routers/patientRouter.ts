import express from 'express';
import patientService from '../services/PatientService';

const router = express.Router();

router.get('/', (_req, res) => {
	return res.send(patientService.getAllPatients())
});

router.post('/', (req, res) => {
	const { name, ssn, dateOfBirth, gender, occupation } = req.body

	const addedPatient = patientService.addPatient({
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation
	})

	return res.json(addedPatient)
})

export default router
