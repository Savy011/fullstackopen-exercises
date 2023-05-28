import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiary from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(diaryService.getEntries());
});

router.post('/', (req, res) => {
	try {
		const newDiaryEntry = toNewDiary(req.body);

		const addedEntry = diaryService.addDiary(newDiaryEntry);
		return res.json(addedEntry);
	} catch (error) {
		let errorMessage = 'Somethign Went Wrong';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		return res.send(400).send(errorMessage);
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
