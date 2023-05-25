import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculatorExpress';
import { calculateExercises } from './exerciseCalculatorExpress';

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get ('/bmi', (req, res) => {
	const { height, weight } = req.query;

	if (!height || !weight) {
		return res.status(400).send({
			error: 'Malformatted or Missing Parameters'
		});
	}
	
	try {
		const { bmi, bmiRemark } = calculateBmi(Number(height), Number(weight));
		return res.status(200).json({ height, weight, bmi, bmiRemark});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return res.status(400).send({ error: error.message });
		}
		return res.status(400).json({ error: 'Some Error Occured' });
	}
});

app.post('/exercises', (req, res) => {
	const { daily_exercises , target } = req.body;

	if (!daily_exercises || !target) {
		return res.status(400).json({
			error: 'Malformatted or Missing Parameters'
		});
	}
	
	try {
		const result = calculateExercises(daily_exercises, Number(target));
		return res.status(200).json(result);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(400).json({ error: error.message });
		}
		return res.status(400).json({ error: 'Some Error Occured' });
	}
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running at Port ${PORT}`);
});
