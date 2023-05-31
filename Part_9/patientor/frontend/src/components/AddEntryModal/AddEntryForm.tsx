import { Button, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import { EntryFormValues, EntryType, HealthCheckRating } from "../../types";

interface Props {
	onClose: () => void
	onSubmit: (values: EntryFormValues) => void
}

const AddPatientForm = ({ onClose, onSubmit }: Props) => {
	const [date, setDate] = useState('')
	const [description, setDescription] = useState('')
	const [specialist, setSpecialist] = useState('')
	const [diagnosisCodes, setDiagnosisCodes] = useState('')
	const [entryType, setEntryType] = useState('')
	const [radioValue, setRadioValue] = useState('')
	
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
					{entryType === EntryType.HealthCheck
						? (<FormControl style={style}>
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
							</FormControl>)
						: null
					}
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
