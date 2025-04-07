import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import { EntryFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  allCodes: string[];
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, allCodes, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} allCodes={allCodes}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
