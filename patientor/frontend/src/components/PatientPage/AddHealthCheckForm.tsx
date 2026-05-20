import { SyntheticEvent, useState } from "react";
import { HealthCheckFormValues, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: HealthCheckFormValues) => void;
  onCancel: () => void;
}

const AddHealthCheckForm = ({ onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.LowRisk);

  const addHealthCheck = (e: SyntheticEvent) => {
    e.preventDefault();

    const healthCheck = {
      date,
      description,
      specialist,
      healthCheckRating,
      type: 'HealthCheck' as const
    };

    onSubmit(healthCheck);
  };

  return (
    <>
      <h3>New Healthcheck Entry</h3>

      <form onSubmit={addHealthCheck}>
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
            Health Check Rating
            <select
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthCheckRating)}
            >
              {Object.entries(HealthCheckRating).map(([key, value]) => (
                <option
                  key={key}
                  value={value}
                >
                  {key} - {value}
                </option>
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

export default AddHealthCheckForm;
