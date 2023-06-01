import { TextField, FormControl, FormLabel, InputLabel } from "@mui/material"

interface Props {
	style: React.CSSProperties
	employerName: string,
	startDate: string,
	endDate: string,
	setEmployerName: React.Dispatch<React.SetStateAction<string>>,
	setStartDate: React.Dispatch<React.SetStateAction<string>>
	setEndDate: React.Dispatch<React.SetStateAction<string>>
}

const OccupationalHealthcareForm = ({
	style,
	employerName,
	startDate,
	endDate,
	setEmployerName,
	setStartDate,
	setEndDate,
}: Props) => {
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
					<InputLabel sx={{ mt: 12 }}>Start Date</InputLabel>
					<TextField
						sx={{ paddingTop: 5 }}
						fullWidth
						type="date"
						value={startDate}
						onChange={e => setStartDate(e.target.value)}
					/>
				</div>
				<div style={style}>
					<InputLabel sx={{ mt: 26 }}>End Date</InputLabel>
					<TextField
						sx={{ paddingTop: 5 }}
						fullWidth
						type="date"
						value={endDate}
						onChange={e => setEndDate(e.target.value)}
					/>
				</div>
			</FormControl>
		</>
	)
}

export default OccupationalHealthcareForm
