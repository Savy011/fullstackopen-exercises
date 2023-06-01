import { Button, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import { EntryFormValues, EntryType, HealthCheckRating } from "../../types";

interface Props {
	onClose: () => void
	onSubmit: (values: EntryFormValues) => void
}

const OccupationalHealthcareForm = ({
	style,
	employerName,
	startDate,
	endDate,
	setEmployerName,
	setStartDate,
	setEndDate,
}: {
	style: React.CSSProperties
	employerName: string,
	startDate: string,
	endDate: string,
	setEmployerName: React.Dispatch<React.SetStateAction<string>>,
	setStartDate: React.Dispatch<React.SetStateAction<string>>
	setEndDate: React.Dispatch<React.SetStateAction<string>>
}) => {
	return (
		<>
			<FormControl sx={{ width: '100%', m: 'none' }}>
				<div style={style}>
					<TextField
					fullWidth
					label="Employer Name"
					value={employerName}
					onChange={e => setEmployerName(e.target.value)}
					/>
				</div>
				<FormLabel sx={{ ml: 1 }}>Sick Leave</FormLabel>
				<div style={style}>
					<TextField
						fullWidth
						label="Start Date"
						value={startDate}
						onChange={e => setStartDate(e.target.value)}
					/>
				</div>
				<div style={style}>
					<TextField
						fullWidth
						label="End Date"
						value={endDate}
						onChange={e => setEndDate(e.target.value)}
					/>
				</div>
			</FormControl>
		</>
	)
}

const HealthCheckForm = ({
	style,
	radioValue,
	setRadioValue
}: {
	style: React.CSSProperties,
	radioValue: string,
	setRadioValue: React.Dispatch<React.SetStateAction<string>>
}) => {
	return (
		<>
			<FormControl style={style}>
				<FormLabel>Health Check Rating</FormLabel>
				<RadioGroup
					row
					value={radioValue} onChange={e => setRadioValue(e.target.value)}
				>
					<FormControlLabel
						value={HealthCheckRating.Healthy}
						control={<Radio />}
						label="Healthy"
					/>
					<FormControlLabel
						value={HealthCheckRating.LowRisk}
						control={<Radio />}
						label="Low Risk"
					/>
					<FormControlLabel
						value={HealthCheckRating.HighRisk}
						control={<Radio />}
						label="High Risk"
					/>
					<FormControlLabel
						value={HealthCheckRating.CriticalRisk}
						control={<Radio />}
						label="Critical Risk"
					/>
				</RadioGroup>
			</FormControl>
		</>
	)
}

const HospitalForm = ({
	style,
	dischargeDate,
	dischargeCriteria,
	setDischargeDate,
	setDischargeCriteria
}: {
	style: React.CSSProperties,
	dischargeDate: string,
	dischargeCriteria: string,
	setDischargeDate: React.Dispatch<React.SetStateAction<string>>,
	setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>
}) => {
	return (
		<FormControl>
			<FormLabel sx={{ mt: 2 }} >Discharge</FormLabel>
			<div style={style}>
			<TextField
				label="Discharge Date"
				value={dischargeDate}
				onChange={e => setDischargeDate(e.target.value)}
			/>
			</div>
			<div style={style}>
				<TextField
					label="Discharge Criteria"
					value={dischargeCriteria}
					onChange={e => setDischargeCriteria(e.target.value)}
				/>
			</div>
		</FormControl>
	)
}

const AddPatientForm = ({ onClose, onSubmit }: Props) => {
	const [date, setDate] = useState('')
	const [description, setDescription] = useState('')
	const [specialist, setSpecialist] = useState('')
	const [diagnosisCodes, setDiagnosisCodes] = useState('')
	const [entryType, setEntryType] = useState('')
	const [radioValue, setRadioValue] = useState('')
	const [dischargeDate, setDischargeDate] = useState('')
	const [dischargeCriteria, setDischargeCriteria] = useState('')
	const [employerName, setEmployerName] = useState('')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	
	const style: React.CSSProperties = {
		margin: 10
	}
	
	const addEntry = (event: React.SyntheticEvent) => {
		event.preventDefault()
		if (entryType === EntryType.HealthCheck) {
			const object = {
				date,
				description,
				specialist,
				diagnosisCodes,
				type: entryType,
				healthCheckRating: Number(radioValue),
			}
			console.log(object)
			onSubmit(object)
		} else if (entryType === EntryType.Hospital) {
			const object = {
				date,
				description,
				specialist,
				diagnosisCodes,
				type: entryType,
				discharge: {
					date: dischargeDate,
					criteria: dischargeCriteria
				}
			}
			console.log(object)
			onSubmit(object)
		} else if (entryType === EntryType.OccupationalHealthcare) {
			const object = {
				date,
				description,
				specialist,
				diagnosisCodes,
				type: entryType,
				employerName,
				sickLeave: {
					startDate,
					endDate
				}
			}

			console.log(object)
			onSubmit(object)
		}
	}

	return (
		<div>
			<FormControl variant="outlined" sx={{width: '100%'}}>
				<div style={style}>
					<TextField
						fullWidth
						label='Date'
						value={date}
						onChange={e => setDate(e.target.value)}
					/>
				</div>
				<div style={style}>
					<TextField
						fullWidth
						label='Description'
						value={description}
						onChange={e =>setDescription(e.target.value)}
					/>
				</div>
				<div style={style}>
					<TextField
						fullWidth
						label='Specialist'
						value={specialist}
						onChange={e => setSpecialist(e.target.value)}
					/>
				</div>
				<div style={style}>
					<TextField
						fullWidth
						label='Diagnosis Codes'
						value={diagnosisCodes}
						onChange={e => setDiagnosisCodes(e.target.value)}
					/>
				</div>
				<div style={style} >
					<TextField
						select
						label="Entry Type"
						defaultValue=""
						fullWidth
						value={entryType || ''}
						onChange={e => setEntryType(e.target.value)}
					>
						<MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
						<MenuItem value={EntryType.HealthCheck}>Health Check</MenuItem>
						<MenuItem value={EntryType.OccupationalHealthcare}>Occupational Healthcare</MenuItem>
					</TextField>
					<div>
					{entryType === EntryType.HealthCheck
						? (<HealthCheckForm
							style={style}
							radioValue={radioValue}
							setRadioValue={setRadioValue}
						/>)
						: entryType === EntryType.Hospital
						? (<HospitalForm
							style={style}
							dischargeCriteria={dischargeCriteria}
							dischargeDate={dischargeDate}
							setDischargeDate={setDischargeDate}
							setDischargeCriteria={setDischargeCriteria}
						/>)
						: entryType === EntryType.OccupationalHealthcare
						? (<OccupationalHealthcareForm
							style={style}
							employerName={employerName}
							startDate={startDate}
							endDate={endDate}
							setEmployerName={setEmployerName}
							setStartDate={setStartDate}
							setEndDate={setEndDate}
						/>)
						: null
					}
					</div>
				</div>
				<Grid>
					<Grid item>
						<Button
							color="primary"
							style={{float: 'right'}}
							variant="contained"
							onClick={addEntry}
						>
							Add
						</Button>
					</Grid>
					<Grid item>
						<Button
							color="error"
							style={{float: 'left'}}
							variant="contained"
							onClick={onClose}
						>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</FormControl>
		</div>
	)
};

export default AddPatientForm;
