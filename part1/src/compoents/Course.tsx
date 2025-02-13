export interface iCourses {
  name: string;
  id: number;
  parts: {
      name: string;
      exercises: number;
      id: number;
  }[];
}

interface iCourseProps {
  name: string;
  parts: iPartProps[];
}

interface iPartProps {
  name: string;
  exercises: number;
  id: number;
}

export const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

const Header = ({header}: { header: string; }) => {
  return (
    <h3>{header}</h3>
  )
}

const Content = ({parts}: { parts: iPartProps[] }) => {
  return (
    <>
      {parts.map( (part: iPartProps) => 
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
    </>
  )
}

const Total = ({parts}: { parts: iPartProps[] }) => {
  const result = parts.reduce((total, part) => total + part.exercises, 0 )

  return (
    <p>Total of {result} exercises</p>
  )
}

const Course = ({ name, parts }: iCourseProps) => {
  return (
    <>
      <Header header={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default Course