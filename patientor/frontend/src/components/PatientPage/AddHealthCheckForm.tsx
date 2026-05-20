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

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value in HealthCheckRating) {
      setHealthCheckRating(value as HealthCheckRating);
    }
  };

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
          <input
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
            placeholder='healthcheck rating'
            value={healthCheckRating}
            onChange={(e) => handleRatingChange(e)}
          />
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
