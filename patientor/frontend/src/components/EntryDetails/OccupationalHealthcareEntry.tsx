import { type OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthCareEntry = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Map<string, string> }) => {
  return (
    <div style={{ border: "1px solid black" }} >
      <p>{entry.date} {entry.type} {entry.employerName}</p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map(diagnosis => (
          <li key={diagnosis}>
            {diagnosis} {diagnoses.get(diagnosis)}
          </li>
        ))}
      </ul>
      {entry.sickLeave &&
        <div>
          <p>start date: {entry.sickLeave.startDate}</p>
          <p>end date: {entry.sickLeave.endDate}</p>
        </div>}
    </div>
  );
};

export default OccupationalHealthCareEntry;
