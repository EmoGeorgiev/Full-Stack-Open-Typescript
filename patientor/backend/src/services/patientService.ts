import patients from '../../data/patients.ts';
import type { NonSSNPatient } from '../types.ts';

const getNonSSNPatients = (): NonSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getNonSSNPatients
};
