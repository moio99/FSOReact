import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const courseTitle = 'Half Stack application development'

  const part1 = 'Fundamentals of React'
  const exercises1 = 10

  const part2 = 'Using props to pass data'
  const exercises2 = 7

  const part3 = 'State of a component'
  const exercises3 = 14

  const course = {
    name: courseTitle,
    parts: [
      {
        name: part1,
        exercises: exercises1
      },
      {
        name: part2,
        exercises: exercises2
      },
      {
        name: part3,
        exercises: exercises3
      }
    ]
  }

  return (
    <>
    <div>
      <Header title={course.name}/>
      <Content course={course}/>
      <Total total={course.parts.length}/> 
    </div>
    </>
  )
}

export default App;
