import { Button, FormControl, Grid, InputLabel, MenuItem, TextField, Select, OutlinedInput, SelectChangeEvent  } from "@mui/material";
import { useState, useEffect } from "react";
import { Diagnose, EntryFormValues, EntryType } from "../../types";
import DiagnoseService from '../../services/diagnose'
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";

interface Props {
	onClose: () => void
	onSubmit: (values: EntryFormValues) => void
}

const AddPatientForm = ({ onClose, onSubmit }: Props) => {
	const [date, setDate] = useState('')
	const [description, setDescription] = useState('')
	const [specialist, setSpecialist] = useState('')
	const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([])
	const [FetchedDiagnosisCodes, setFetchedDiagnosisCodes] = useState<Diagnose[]>([])
	const [entryType, setEntryType] = useState('')
	const [radioValue, setRadioValue] = useState('')
	const [dischargeDate, setDischargeDate] = useState('')
	const [dischargeCriteria, setDischargeCriteria] = useState('')
	const [employerName, setEmployerName] = useState('')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	useEffect(() => {
		const fetchCodes = async () => {
			const codes = await DiagnoseService.getAllDiagnose()
			setFetchedDiagnosisCodes(codes)
		}
		
		void fetchCodes()
	}, [])

	const style: React.CSSProperties = {
		margin: 10
	}
	
	const handleChange = (event:  SelectChangeEvent<typeof diagnosisCodes>) => {
		const {
		  target: { value },
		} = event;
		setDiagnosisCodes(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	
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
			onSubmit(object)
		}
	}

	return (
		<div>
			<FormControl variant="outlined" sx={{width: '100%'}}>
				<div style={style}>
					<InputLabel sx={{ ml: 2 }}>Date</InputLabel>
					<TextField
						sx={{ paddingTop: 5 }}
						fullWidth
						type="date"
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
					<FormControl sx={{width: '100%'}}>
						<InputLabel id="test-select-label">Diagnose Codes</InputLabel>
						<Select
							multiple
							fullWidth
							value={diagnosisCodes}
							onChange={handleChange}
							input={<OutlinedInput label="Diagnosis Codes" />}
						>
							{FetchedDiagnosisCodes.map((code) => (
								<MenuItem
								key={code.name}
								value={code.code}
								>
									{code.code}
								</MenuItem>
							))}
						</Select>
					</FormControl>
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
