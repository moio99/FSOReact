import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import diagnoesService from "../../services/diagnoses";
import { Entry, Gender, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

type EntryDetailProps = {
  entry: Entry;
};

const HealthCheckEntryDetail = ({ entry }: EntryDetailProps) => {
  const healthCheckEntry = entry as HealthCheckEntry;
  return (
    <div>
      <EntryDetailDefault entry={entry} />
      <div>health check rating: {healthCheckEntry.healthCheckRating}</div>
    </div>
  );
};

const HospitalEntryDetail = ({ entry }: EntryDetailProps) => {
  const hospitalEntry = entry as HospitalEntry;
  return (
    <div>
      <EntryDetailDefault entry={entry} />
      <div>diagnosis codes: {hospitalEntry.diagnosisCodes.map((code) => code).join(', ')}</div>
      <div>discharge: {hospitalEntry.discharge.date} {hospitalEntry.discharge.criteria}</div>
    </div>
  );
};

const OccupationalHealthCareEntryDetail = ({ entry }: EntryDetailProps) => {
  const occupationalHealthCareEntry = entry as OccupationalHealthCareEntry;
  return (
    <div>
      <EntryDetailDefault entry={entry} />
      <div>employer name: {occupationalHealthCareEntry.employerName}</div>
      <div>diagnosis codes: {occupationalHealthCareEntry.diagnosisCodes.map((code) => code).join(', ')}</div>
      <div>sick leave: {occupationalHealthCareEntry.sickLeave.startDate} - {occupationalHealthCareEntry.sickLeave.endDate}</div>
    </div>
  );
};

const EntryDetailDefault = ({ entry }: EntryDetailProps) => {
  return (
    <div key={entry.id}>
      <p>{entry.date} {entry.description}</p>
      { entry.diagnosisCodes ? (
        <ul>
        {entry.diagnosisCodes?.map((code, i) => (
          <li key={code}>
            {code} {entry.diagnosisDescriptions ? entry.diagnosisDescriptions[i] : 'no description'}
          </li>
        ))}
      </ul>                
      ) : (<p>no diagnosis</p>) }
    </div>
  );
};

const EntryDetail = ({ entry }: EntryDetailProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <div style={{ border: "1px solid black" }}>
          <HealthCheckEntryDetail entry={entry} />
        </div>
      );
    case 'Hospital':
      return (
        <div style={{ border: "1px solid black" }}>
          <HospitalEntryDetail entry={entry} />
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div style={{ border: "1px solid black" }}>
          <OccupationalHealthCareEntryDetail entry={entry} />
        </div>
      );
    default:
      return <EntryDetailDefault entry={entry} />;
  }
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const patientRecived = await patientService.getPatient(id);
        const newPatient = { 
          ...patientRecived, 
          entries: await Promise.all(patientRecived.entries.map(async (entry: Entry) => {
            if (entry && entry.diagnosisCodes && entry.diagnosisCodes.length > 0) {
              const descriptions = await Promise.all(
                entry.diagnosisCodes.map(async (code) => {
                  const diagnosis = await diagnoesService.getDiagnosis(code);
                  return diagnosis.name;
                })
              );
              return {
                ...entry, 
                diagnosisDescriptions: descriptions
              };
            } else {
              return entry;
            }
          }))
        };
        setPatient(newPatient);
      };
      
      void fetchPatient();
    } else {
      setPatient(undefined);
    }
  }, [id]);

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  if (patient) {
    return (
      <div>
        <h2>{patient.name} {getGenderIcon(patient.gender)}</h2>
        <div>ssh: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        {patient.entries ? (
          <div>
            <h3>entries</h3>
            {patient.entries.map((entry) => (
              <EntryDetail key={entry.id} entry={entry} />
            ))}
          </div>
        ) : null}
      </div>
    );
  } else {
    return (<p>Not found</p>);
  }
};

export default PatientPage;