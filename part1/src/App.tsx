interface WelcomeProps {
  name: string;
}
interface ContentProps {
  courseParts: CourseProps[];
}
interface CourseProps {
  name: string;
  exerciseCount: number;
}
interface TotalProps {
  totalExercises: number;
}

const Welcome = (props: WelcomeProps) => {
  return <h1>{props.name}</h1>;
};
const Content = (props: ContentProps) => {
  return (
    props.courseParts.map((part) => (
      <p key={part.name}>
        {part.name} {part.exerciseCount}
      </p>
    ))
  );
};
const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises {props.totalExercises}
    </p>
  )
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Welcome name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;