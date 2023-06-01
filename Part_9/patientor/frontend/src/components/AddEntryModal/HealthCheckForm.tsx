import { FormLabel, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { HealthCheckRating } from "../../types"

interface Props {
	style: React.CSSProperties,
	radioValue: string,
	setRadioValue: React.Dispatch<React.SetStateAction<string>>
}

const HealthCheckForm = ({
	style,
	radioValue,
	setRadioValue
}: Props) => {
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

export default HealthCheckForm
