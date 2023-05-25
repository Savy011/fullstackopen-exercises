import express from 'express';
import diagnoseService from '../services/DiagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
	return res.send(diagnoseService.getAllDiagnoses())
});

export default router
