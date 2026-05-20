import { SyntheticEvent, useState } from "react";
import { Diagnosis, OccupationalHealthcareFormValues } from "../../types";
import { diagnoses } from "../../constants";

interface Props {
  onSubmit: (values: OccupationalHealthcareFormValues) => void,
  onCancel: () => void
}

const AddOccupationalHealthcareForm = ({ onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
  const [employerName, setEmployerName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleDiagnosCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setDiagnosisCodes(selected);
  };

  const addOccupationalHealthcare = (e: SyntheticEvent) => {
    e.preventDefault();

    const occupationalHealthcare = {
      date,
      description,
      specialist,
      diagnosisCodes,
      employerName,
      type: 'OccupationalHealthcare' as const
    };

    if (startDate === '' || endDate === '') {
      onSubmit(occupationalHealthcare);
      return;
    }

    const sickLeave = {
      startDate,
      endDate
    };

    onSubmit({
      ...occupationalHealthcare,
      sickLeave
    });
  };

  return (
    <>
      <h3>New Occupational Healthcare Entry</h3>

      <form onSubmit={addOccupationalHealthcare}>
        <div>
          <input
            type='date'
            placeholder='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='specialist'
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
        <div>
          <input
            type='date'
            placeholder='Start date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <input
            type='date'
            placeholder='End date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder='Employer name'
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
        </div>

        <div>
          <select
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosCodeChange}
          >
            {diagnoses.map(diagnoses => (
              <option key={diagnoses.code} value={diagnoses.code}>{diagnoses.code} - {diagnoses.name}</option>
            ))}
          </select>
        </div>

        <button type='submit'>
          Add
        </button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default AddOccupationalHealthcareForm;
