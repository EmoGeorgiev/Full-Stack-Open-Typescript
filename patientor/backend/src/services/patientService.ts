import patients from '../../data/patients.ts';
import type { NewPatient, NonSSNPatient, Patient } from '../types.ts';
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
  findPatient
};
