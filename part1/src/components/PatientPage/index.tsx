import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import { Patient } from '../../types';
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
        setPatient(patientRecived);
      };
      void fetchPatient();
    } else {
      setPatient(undefined);
    }
  }, [id]);

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      case 'other':
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
      </div>
    );
  } else {
    return (<p>Not found</p>);
  }
};

export default PatientPage;