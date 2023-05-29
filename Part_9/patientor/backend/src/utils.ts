import { Discharge, HealthCheckEntry, OccupationalHealthcareEntry, SickLeave } from './types';
import { HealthCheckRating } from './types';
import { EntryType } from './types';
import { Gender, NewPatient, NewEntry, Diagnose, NewBaseEntry, HospitalEntry } from './types';

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or Missing Data');
	}

	if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
		const newPatient: NewPatient = {
			name: parseTextData(object.name, 'Name'),
			ssn: parseTextData(object.ssn, 'SSN'),
			dateOfBirth: parseDate(object.dateOfBirth),
			gender: parseGender(object.gender),
			occupation: parseTextData(object.occupation, 'Occupation')
		};

		return newPatient;
	} else {
		throw new Error('Incorrect Data: Some Fields are Missing');
	}
};

const toNewEntry = (object: unknown): NewEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or Missing Data');
	}

	if ('description' in object && 'type' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
		let newEntry: NewBaseEntry = {
			description: parseTextData(object.description, 'Description'),
			date: parseDate(object.date),
			specialist: parseTextData(object.specialist, 'Specialist'),
			diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
		}
		
		switch (object.type) {
			case EntryType.HealthCheck:
				return parseHealthCheckEntry(object, newEntry)
			case EntryType.Hospital:
				return parseHospitalEntry(object, newEntry)
			case EntryType.OccupationalHealthcare:
				return parseOccupationalHealthcareEntry(object, newEntry)
			default:
				throw new Error('Incorrect or Missing Entry Type')
		}

	} else {
		throw new Error('Incorrect Data: Some Fields are Missing');
	}
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

const parseHealthCheckEntry = (object: unknown, baseEntry: NewBaseEntry): Omit<HealthCheckEntry, 'id'> => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or Missing Data')
	}

	if ('healthCheckRating' in object) {
		const healthCheckEntry: Omit<HealthCheckEntry, 'id'> = {
            ...baseEntry,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            type: EntryType.HealthCheck,
        }

		return healthCheckEntry;
	} else {
		throw new Error('Incorrect Data: Health Check Rating Field is Missing')
	}
}
const parseHospitalEntry = (object: unknown, baseEntry: NewBaseEntry): Omit<HospitalEntry, 'id'>=> {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or Missing Data');
	}

	if ('discharge' in object) {
		const hospitalEntry: Omit<HospitalEntry, 'id'> = {
			...baseEntry,
			type: EntryType.Hospital,
			discharge: parseDischarge(object.discharge)
		};

		return hospitalEntry;
	} else {
		throw new Error('Incorrect Data: Discharge Field is Missing');
	}
};

const parseOccupationalHealthcareEntry = (object: unknown, baseEntry: NewBaseEntry): Omit<OccupationalHealthcareEntry, 'id'> => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or Missing Data')
	}

	if ('employerName' in object && 'sickLeave' in object) {
		const parsedOccupationalHealthcareEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
			...baseEntry,
			type: EntryType.OccupationalHealthcare,
			employerName: parseTextData(object.employerName, 'Employer Name'),
			sickLeave: parseSickLeave(object.sickLeave)
		}

		return parsedOccupationalHealthcareEntry
	} else {
		throw new Error('Incorrect or Missing Occupational Healthcare Data')
	}
}

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> =>  {
	if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
		throw new Error('Incorrect Diagnosis Codes')
	}
	
	const codes: Array<Diagnose['code']> = [];

	diagnosisCodes.forEach(code =>{
		if (typeof code === 'string') {
			codes.push(code)
		} else {
			throw new Error('Incorrect or Missing Diagnose Code')
		}
	})

	return codes
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
	if (typeof healthCheckRating !== 'number' || isNaN(healthCheckRating)) {
		throw new Error('Incorrect or Missing Health Check Rating');
	}

	if (Object.values(HealthCheckRating).includes(healthCheckRating)) {
		return healthCheckRating as HealthCheckRating;
	} else {
		throw new Error('Incorrect Health Check Rating');
	}
};

const parseDischarge = (discharge: unknown): Discharge => {
	if (!discharge || typeof discharge !== 'object') {
		throw new Error('Incorrect or Missing Discharge Data');
    }
	
	if ('date' in discharge && 'criteria' in discharge) {
		const parsedDischarge: Discharge = {
			date: parseDate(discharge.date),
			criteria: parseTextData(discharge.criteria, 'criteria')
		}

		return parsedDischarge
	} else {
		throw new Error('Incorrect or Missing Discharge Data')
	}
}

const parseSickLeave = (sickLeave: unknown): SickLeave => {
	if (!sickLeave || typeof sickLeave !== 'object') {
		throw new Error('Incorrect or Missing Data')
	}

	if ('startDate' in sickLeave && 'endDate' in sickLeave) {
		const parsedSickLeave: SickLeave = {
			startDate: parseDate(sickLeave.startDate),
			endDate: parseDate(sickLeave.endDate)
		}

		return parsedSickLeave
	} else {
		throw new Error('Incorrect or Missing Sick Leave Data')
	}
}

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(g => g.toString()).includes(param);
};

export default { toNewPatient, toNewEntry };
