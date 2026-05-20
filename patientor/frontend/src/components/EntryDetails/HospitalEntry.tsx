import { type HospitalEntry } from "../../types";

const HospitalEntry = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Map<string, string> }) => {
  return (
    <div style={{ border: "1px solid black" }} >
      <p>{entry.date} {entry.type}</p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map(diagnosis => (
          <li key={diagnosis}>
            {diagnosis} {diagnoses.get(diagnosis)}
          </li>
        ))}
      </ul>
      <p>discharge: {entry.discharge.date}</p>
      <p>criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

export default HospitalEntry;
