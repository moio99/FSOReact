interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseDesc {
  backgroundMaterial: string;
  kind: "background"
}
export enum Requirements {
  Nodejs = 'nodejs',
  Jest = 'jest',
}

interface CoursePartSpecial extends CoursePartBaseDesc {
  requirements: (Requirements.Nodejs | Requirements.Jest)[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface WelcomeProps {
  name: string;
}
interface ContentProps {
  courseParts: CoursePart[];
}
interface TotalProps {
  totalExercises: number;
}
interface PartProps {
  parts: CoursePart;
}

const Welcome = (props: WelcomeProps) => {
  return <h1>{props.name}</h1>;
};
const Part = (props: PartProps) => {
  let atributes: string[] = [];
  switch (props.parts.kind) {
    case "basic":
      atributes.push(props.parts.description);
      break;
    case "group":
      atributes.push("project exercises: " + props.parts.groupProjectCount);
      break;
    case "background":
      atributes.push(props.parts.description);
      atributes.push("submid to: " + props.parts.backgroundMaterial);
      break;
    case "special":
      atributes.push(props.parts.description);
      atributes.push("required skils: " + props.parts.requirements.join(', '));
      break;
  }
  return (
    atributes.map((atribute) => <div key={atribute}>{atribute}</div>)
  )
}
const Content = (props: ContentProps) => {
  return (
    props.courseParts.map((part) => (
      <div key={part.name}>
        <div><strong>{part.name} {part.exerciseCount}</strong></div>
        <Part parts={part} />
      </div>
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
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