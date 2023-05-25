import diagnoses from '../../data/diagnoses';

import { Diagnose } from '../types';

const getAllDiagnoses = (): Diagnose[] => {
	return diagnoses.map(({ code, name, latin }) => ({
		code,
		name,
		latin
	}));
};

export default { getAllDiagnoses }
