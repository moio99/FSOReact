
export interface iPart {
  part: {
    name: string;
    exercises: number;
  }
}

const Part = ({part}:iPart) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  );
};

export default Part