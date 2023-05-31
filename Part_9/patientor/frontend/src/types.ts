export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other"
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

export enum EntryType {
	Hospital = "Hospital",
	OccupationalHealthcare = "OccupationalHealthcare",
	HealthCheck = "HealthCheck"
}

interface Discharge {
	date: string;
	criteria: string;
}

interface SickLeave {
	startDate: string;
	endDate: string;
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnose['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
	type: EntryType.HealthCheck;
	healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
	type: EntryType.Hospital;
	discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: EntryType.OccupationalHealthcare;
	employerName: string;
	sickLeave?: SickLeave;
}

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry


export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues = {
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: string;
	type: string;
	healthCheckRating?: Number;
	discharge?: {
		date: string;
		criteria: string;
	};
	sickLeave?: {
		startDate: string;
		endDate: string;
	}
}
