import { useParams } from 'react-router-dom';
import patientService from '../../services/patients.ts';
import { useEffect, useState } from 'react';
import { Patient } from '../../types.ts';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const findPatient = async (id: string) => {
      const patient = await patientService.findById(id);
      setPatient(patient);
    };

    if (id) {
      findPatient(id);
    }
  }, [id]);

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>gender: {patient?.gender}</p>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <p>date of birth: {patient?.dateOfBirth}</p>
    </div>
  );
};

export default PatientPage;
