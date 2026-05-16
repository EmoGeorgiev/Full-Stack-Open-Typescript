import patients from '../../data/patients.ts';
import type { Entry, NewEntry, NewPatient, NonSSNPatient, Patient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getNonSSNPatients = (): NonSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findPatient = (id: string) => {
  return patients.find(p => p.id === id);
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const id = uuid();

  const newEntry = {
    id,
    ...entry
  };

  const patient = findPatient(patientId);

  patient?.entries.push(newEntry);

  return newEntry;
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSSNPatients,
  addPatient,
  findPatient,
  addEntry
};
