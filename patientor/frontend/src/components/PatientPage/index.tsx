import { useParams } from 'react-router-dom';
import patientService from '../../services/patients.ts';
import { useEffect, useState } from 'react';
import { HealthCheckFormValues, Patient } from '../../types.ts';
import diagnosesService from '../../services/diagnoses.ts';
import EntryDetails from '../EntryDetails/index.tsx';
import AddHealthCheckForm from './AddHealthCheckForm.tsx';
import axios from 'axios';

const PatientPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
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

  const submitNewEntry = async (values: HealthCheckFormValues) => {
    try {
      if (id) {
        const entry = await patientService.addEntry(id, values);
        setPatient(prev =>
          prev
            ? {
              ...prev,
              entries: prev.entries.concat(entry)
            }
            : prev
        );
        setError('');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(` Error: ${error.message}`);
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>gender: {patient?.gender}</p>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <p>date of birth: {patient?.dateOfBirth}</p>
      <h3>entries</h3>
      {patient?.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}

      <p style={{ color: 'red', whiteSpace: 'pre-line' }}>{error}</p>

      {!modalOpen &&
        <button onClick={() => setModalOpen(true)}>
          Add New Entry
        </button>}

      {modalOpen &&
        <AddHealthCheckForm
          onSubmit={submitNewEntry}
          onCancel={closeModal}
        />}
    </div>
  );
};

export default PatientPage;
