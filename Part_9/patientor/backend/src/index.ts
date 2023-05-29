import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routers/diagnoseRouter';
import patientRouter from './routers/patientRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
	return res.status(200).send('pong');
});

app.use('/api/diagnose', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
