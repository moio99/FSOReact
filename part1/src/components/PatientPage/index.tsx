import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import diagnoesService from "../../services/diagnoses";
import { Entry, Gender, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';


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