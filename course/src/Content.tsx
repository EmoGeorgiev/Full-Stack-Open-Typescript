interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map(c => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>))}
    </>
  );
};

export default Content;
