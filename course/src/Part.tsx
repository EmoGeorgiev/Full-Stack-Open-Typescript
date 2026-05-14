import type { CoursePart } from './App';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.kind) {
    case 'basic':
      return (
        <>
          <p>{coursePart.name} {coursePart.exerciseCount}</p>
          <p>{coursePart.description}</p>
        </>
      );
    case 'group':
      return (
        <>
          <p>{coursePart.name} {coursePart.exerciseCount}</p>
          <p>{coursePart.groupProjectCount}</p>
        </>
      );
    case 'background':
      return (
        <>
          <p>{coursePart.name} {coursePart.exerciseCount}</p>
          <p>{coursePart.description}</p>
          <p>{coursePart.backgroundMaterial}</p>
        </>
      );
    case 'special':
      return (
        <>
          <p>{coursePart.name} {coursePart.exerciseCount}</p>
          <p>{coursePart.description}</p>
          <p>{coursePart.requirements}</p>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
