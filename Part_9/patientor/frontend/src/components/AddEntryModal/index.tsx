import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import { EntryFormValues } from '../../types';

import AddEntryForm from "./AddEntryForm";

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: EntryFormValues) => void;
	error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, error, onSubmit }: Props) => (
	<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
		<DialogTitle>Add a Entry</DialogTitle>
		<Divider />
		<DialogContent>
			{error && <Alert severity="error">{error}</Alert>}
			<AddEntryForm onClose={onClose} onSubmit={onSubmit} />
		</DialogContent>
	</Dialog>
);

export default AddEntryModal;
