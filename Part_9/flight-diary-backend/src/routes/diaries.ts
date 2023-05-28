import express from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(diaryService.getEntries());
});

router.post('/', (req, res) => {
	try {
		const addedEntry: DiaryEntry = diaryService.addDiary(req.body as NewDiaryEntry);
		return res.json(addedEntry);
	} catch (error) {
		let errorMessage = 'Something Went Wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.status(400).json({ error: errorMessage });
	}
});

router.get('/:id', (req, res) => {
	const diary = diaryService.findById(Number(req.params.id));

	if (diary) {
		res.send(diary);
	} else {
		res.sendStatus(404);
	}
});

export default router;
