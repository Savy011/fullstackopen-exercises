import express from 'express';
import patientService from '../services/PatientService';

const router = express.Router();

router.get('/', (_req, res) => {
	return res.send(patientService.getAllPatients())
});

export default router
