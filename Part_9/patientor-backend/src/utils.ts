import { Gender, NewPatient } from './types';

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or Missing Data');
	}

	if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
		const newPatient: NewPatient = {
			name: parseTextData(object.name, 'Name'),
			ssn: parseTextData(object.ssn, 'SSN'),
			dateOfBirth: parseDate(object.dateOfBirth),
			gender: parseGender(object.gender),
			entries: [],
			occupation: parseTextData(object.occupation, 'Occupation')
		};

		return newPatient;
	}

	throw new Error('Incorrect Data: Some Fields are Missing');
};

const parseTextData = (text: unknown, type: string): string => {
	if (!isString(text)) {
		throw new Error(`Incorrect or Missing ${type}`);
	}

	return text;
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error('Incorrect or Missing Date');
	}

	return date;
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or Missing Gender');
	}

	return gender;
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(g => g.toString()).includes(param);
};

export default toNewPatient;
