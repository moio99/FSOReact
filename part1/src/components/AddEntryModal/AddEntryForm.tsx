import { useState } from "react";
import { EntryFormValues, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthCareEntry } from "../../types";

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

    console.log('Data to be submitted:', fullEntry);
    onSubmit(fullEntry);
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px' }}>

      <label>Tipo:</label>
      <select value={type} onChange={(e) => setType(e.target.value as EntryFormValues['type'])}>
        <option value="HealthCheck">Health Check</option>
        <option value="Hospital">Hospital</option>
        <option value="OccupationalHealthcare">Occupational Healthcare</option>
      </select>

      <input name="description" placeholder="Descripción" value={baseFields.description} onChange={handleBaseChange} />
      <input name="date" type="date" value={baseFields.date} onChange={handleBaseChange} />
      <input name="specialist" placeholder="Especialista" value={baseFields.specialist} onChange={handleBaseChange} />

      <div style={{ marginTop: '1rem' }}>
        <select value={codeInput} onChange={(e) => setCodeInput(e.target.value)}>
          {allCodes.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
        <input placeholder="Descripción" value={descInput} onChange={(e) => setDescInput(e.target.value)} />
        <button onClick={handleAddDiagnosis}>add diagnosis</button>
      </div>
      <ul>
        {diagnosisCodes.map((code, i) => (
          <li key={code}>{code} - {diagnosisDescriptions[i]}</li>
        ))}
      </ul>

      {type === 'HealthCheck' && (
        <div>
          <label>Health Check Rating:</label>
          <select value={healthCheckRating} onChange={(e) => setHealthCheckRating(Number(e.target.value))}>
            <option value={HealthCheckRating.Healthy}>Healthy</option>
            <option value={HealthCheckRating.LowRisk}>Low Risk</option>
            <option value={HealthCheckRating.HighRisk}>High Risk</option>
            <option value={HealthCheckRating.CriticalRisk}>Critical Risk</option>
          </select>
        </div>
      )}

      {type === 'Hospital' && (
        <div>
          <input placeholder="Discharge Date" type="date" value={discharge.date} onChange={(e) => setDischarge({ ...discharge, date: e.target.value })} />
          <input placeholder="Discharge Criteria" value={discharge.criteria} onChange={(e) => setDischarge({ ...discharge, criteria: e.target.value })} />
        </div>
      )}

      {type === 'OccupationalHealthcare' && (
        <div>
          <input placeholder="Employer Name" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
          <input placeholder="Sick Leave Start" type="date" value={sickLeave.startDate} onChange={(e) => setSickLeave({ ...sickLeave, startDate: e.target.value })} />
          <input placeholder="Sick Leave End" type="date" value={sickLeave.endDate} onChange={(e) => setSickLeave({ ...sickLeave, endDate: e.target.value })} />
        </div>
      )}
      <button onClick={onCancel} style={{ marginTop: '1rem' }}>Cancel</button>
      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>Save Entry</button>
    </div>
  );
};


export default AddEntryForm;