import { TextField, FormControl, FormLabel, InputLabel } from "@mui/material"

interface Props {
	style: React.CSSProperties,
	dischargeDate: string,
	dischargeCriteria: string,
	setDischargeDate: React.Dispatch<React.SetStateAction<string>>,
	setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>
}

const HospitalForm = ({
	style,
	dischargeDate,
	dischargeCriteria,
	setDischargeDate,
	setDischargeCriteria
}: Props) => {
	return (
		<FormControl>
			<FormLabel sx={{ mt: 2 }} >Discharge</FormLabel>
			<div style={style}>
			<InputLabel sx={{ mt: 4.5 }}>Discharge Date</InputLabel>
			<TextField
				sx={{ paddingTop: 5 }}
				type='date'
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

export default HospitalForm
