import { useState } from "react";
import { EntryFormValues, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthCareEntry } from "../../types";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box, Typography } from "@mui/material";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  allCodes: string[];
}

const AddEntryForm = ({ onCancel, onSubmit, allCodes }: Props) => {
  const [type, setType] = useState<EntryFormValues['type']>('HealthCheck');
  const [baseFields, setBaseFields] = useState({
    description: '',
    date: '',
    specialist: ''
  });

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnosisDescriptions, setDiagnosisDescriptions] = useState<string[]>([]);
  const [codeInput, setCodeInput] = useState('');
  const [descInput, setDescInput] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [discharge, setDischarge] = useState({ date: '', criteria: '' });
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: '' });

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBaseFields(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDiagnosis = () => {
    if (codeInput.trim() && descInput.trim()) {
      setDiagnosisCodes([...diagnosisCodes, codeInput]);
      setDiagnosisDescriptions([...diagnosisDescriptions, descInput]);
      setCodeInput('');
      setDescInput('');
    }
  };

  const handleSubmit = () => {
    const common = {
      ...baseFields,
      diagnosisCodes,
      diagnosisDescriptions,
    };

    let fullEntry: EntryFormValues;

    switch (type) {
      case 'HealthCheck':
        fullEntry = {
          ...common,
          type,
          healthCheckRating,
        } as HealthCheckEntry;
        break;
      case 'Hospital':
        fullEntry = {
          ...common,
          type,
          discharge
        } as HospitalEntry;
        break;
      case 'OccupationalHealthcare':
        fullEntry = {
          ...common,
          type,
          employerName,
          sickLeave
        } as OccupationalHealthCareEntry;
        break;
      default:
        return;
    }

    onSubmit(fullEntry);
  };

  return (
    <Box sx={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px' }}>
      <Typography variant="h6">Add New Entry</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value as EntryFormValues['type'])}>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        name="description"
        label="Descripción"
        value={baseFields.description}
        onChange={handleBaseChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="date"
        type="date"
        label="Fecha"
        InputLabelProps={{ shrink: true }}
        value={baseFields.date}
        onChange={handleBaseChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="specialist"
        label="Especialista"
        value={baseFields.specialist}
        onChange={handleBaseChange}
      />

      <Box sx={{ marginTop: '1rem' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Código de Diagnóstico</InputLabel>
          <Select value={codeInput} onChange={(e) => setCodeInput(e.target.value)}>
            {allCodes.map((code) => (
              <MenuItem key={code} value={code}>{code}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          value={descInput}
          onChange={(e) => setDescInput(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddDiagnosis}>Añadir Diagnóstico</Button>
      </Box>
      <ul>
        {diagnosisCodes.map((code, i) => (
          <li key={code}>{code} - {diagnosisDescriptions[i]}</li>
        ))}
      </ul>

      {type === 'HealthCheck' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Health Check Rating</InputLabel>
          <Select value={healthCheckRating} onChange={(e) => setHealthCheckRating(Number(e.target.value))}>
            <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
          </Select>
        </FormControl>
      )}

      {type === 'Hospital' && (
        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="Discharge Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={discharge.date}
            onChange={(e) => setDischarge({ ...discharge, date: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Discharge Criteria"
            value={discharge.criteria}
            onChange={(e) => setDischarge({ ...discharge, criteria: e.target.value })}
          />
        </Box>
      )}

      {type === 'OccupationalHealthcare' && (
        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="Employer Name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Sick Leave Start"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={sickLeave.startDate}
            onChange={(e) => setSickLeave({ ...sickLeave, startDate: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Sick Leave End"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={sickLeave.endDate}
            onChange={(e) => setSickLeave({ ...sickLeave, endDate: e.target.value })}
          />
        </Box>
      )}
      <Button variant="outlined" onClick={onCancel} sx={{ marginTop: '1rem' }}>Cancel</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: '1rem' }}>Save Entry</Button>
    </Box>
  );
};

export default AddEntryForm;
