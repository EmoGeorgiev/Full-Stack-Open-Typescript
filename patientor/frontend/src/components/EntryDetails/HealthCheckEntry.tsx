import { type HealthCheckEntry } from "../../types";

const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div style={{ border: "1px solid black" }} >
      <p>{entry.date} {entry.type}</p>
      <p>{entry.description}</p>
      <p>rating: {entry.healthCheckRating}</p>
      <p>diagnose by {entry.specialist}</p>
    </div >
  );
};

export default HealthCheckEntry;
