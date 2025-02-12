interface iCourseProps {
  id: number;
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
    <h2>{header}</h2>
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

const Course = ({ id, name, parts }: iCourseProps) => {
  return (
    <>
      <Header header={name} />
      <div key={id}>
        <Content parts={parts} />
      </div>
    </>
  )
}

export default Course