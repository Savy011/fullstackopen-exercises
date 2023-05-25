import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculatorExpress';

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
})

app.get ('/bmi', (req, res) => {
	const { height, weight } = req.query

	if (!height || !weight) {
		return res.status(400).send({
			error: 'Malformatted or Missing Parameters'
		})
	}
	
	try {
		const {bmi, bmiRemark } = calculateBmi(Number(height), Number(weight))
		return res.status(200).json({ height, weight, bmi, bmiRemark})
	} catch (error) {
		return res.status(400).send({ error: error.message })
	}
})

const PORT = 3003

app.listen(PORT, () => {
	console.log(`Server running at Port ${PORT}`);
})
