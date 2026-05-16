import { Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthCareEntry from "./OccupationalHealthcareEntry";

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Map<string, string> }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntry entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
