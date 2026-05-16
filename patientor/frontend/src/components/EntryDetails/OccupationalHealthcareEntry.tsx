import { type OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthCareEntry = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Map<string, string> }) => {
  return (
    <div style={{ border: "1px solid black" }} >
      <p>{entry.date} {entry.type} {entry.employerName}</p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthCareEntry;
