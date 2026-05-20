import { SyntheticEvent, useState } from "react";
import { Diagnosis, HospitalFormValues } from "../../types";
import { diagnoses } from "../../constants";

interface Props {
  onSubmit: (values: HospitalFormValues) => void,
  onCancel: () => void
}

const AddHospitalForm = ({ onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

  const handleDiagnosCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setDiagnosisCodes(selected);
  };

  const addHospital = (e: SyntheticEvent) => {
    e.preventDefault();

    const discharge = {
      date: dischargeDate,
      criteria: dischargeCriteria
    };

    const hospital = {
      date,
      description,
      specialist,
      discharge,
      diagnosisCodes,
      type: 'Hospital' as const
    };

    onSubmit(hospital);
  };

  return (
    <>
      <h3>New Hospital Entry</h3>

      <form onSubmit={addHospital}>
        <div>
          <label>
            Date
            <input
              type='date'
              placeholder='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <input
              placeholder='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Specialist
            <input
              placeholder='specialist'
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Discharge date
            <input
              type='date'
              placeholder='Discharge date'
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Discharge criteria
            <input
              placeholder='Discharge criteria'
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Diagnosis codes
            <select
              multiple
              value={diagnosisCodes}
              onChange={handleDiagnosCodeChange}
            >
              {diagnoses.map(diagnoses => (
                <option key={diagnoses.code} value={diagnoses.code}>{diagnoses.code} - {diagnoses.name}</option>
              ))}
            </select>
          </label>
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

export default AddHospitalForm;
