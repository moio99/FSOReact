interface iCourseProps {
  name: string;
  parts: iPartProps[];
}

interface iPartProps {
  name: string;
  exercises: number;
  id: number;
}

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