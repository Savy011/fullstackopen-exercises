import { Female, Male, Transgender } from '@mui/icons-material';
import { Gender } from '../../types';

const GenderIcon = ({ gender }: { gender: Gender}): JSX.Element | null => {
	if (gender === Gender.Male) {
		return <Male fontSize='large' />
	} else if (gender === Gender.Female) {
		return <Female fontSize='large' />
	} else if (gender === Gender.Other) {
		return <Transgender fontSize='large' />
	} else {
		return null
	}
}

export default GenderIcon
