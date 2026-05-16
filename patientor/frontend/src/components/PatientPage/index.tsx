import { useParams } from 'react-router-dom';
import patientService from '../../services/patients.ts';
import { useEffect, useState } from 'react';
import { Patient } from '../../types.ts';
import diagnosesService from '../../services/diagnoses.ts';
import EntryDetails from '../EntryDetails/index.tsx';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Map<string, string>>(new Map());
  const { id } = useParams();

  useEffect(() => {
    const findPatient = async (id: string) => {
      const patient = await patientService.findById(id);
      setPatient(patient);
    };

    const getDiagnoses = async () => {
      const newDiagnoses = await diagnosesService.getAll();
      setDiagnoses(new Map(newDiagnoses.map(diagnosis => [diagnosis.code, diagnosis.name])));
    };

    if (id) {
      findPatient(id);
    }

    getDiagnoses();
  }, [id]);

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>gender: {patient?.gender}</p>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <p>date of birth: {patient?.dateOfBirth}</p>
      <h3>entries</h3>
      {patient?.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientPage;
