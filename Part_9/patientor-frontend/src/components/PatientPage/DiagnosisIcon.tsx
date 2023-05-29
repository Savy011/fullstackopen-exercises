import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faSuitcaseMedical, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { Entry } from '../../types';

const DiagnosisIcon = ({ entry }: { entry: Entry }): JSX.Element | null => {
	switch (entry.type) {
		case 'Hospital':
			return <FontAwesomeIcon icon={faHospital} />;
		case 'OccupationalHealthcare':
			return <FontAwesomeIcon icon={faSuitcaseMedical} />
		case 'HealthCheck':
			return <FontAwesomeIcon icon={faHeartPulse} />
		default:
			return null;
	}
}

export default DiagnosisIcon
