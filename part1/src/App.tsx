import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const courseTitle = 'Half Stack application development'

  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const contentA = { course: { part: part1, exercises: exercises1} }

  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const contentB = { course: { part: part2, exercises: exercises2 } }

  const part3 = 'State of a component'
  const exercises3 = 14
  const contentC = { course: { part: part3, exercises: exercises3 } }

  const content = [contentA, contentB, contentC]

  return (
    <>
    <div>
      <Header title={courseTitle}/>
      <Content content={content}/>
      <Total total={content.length}/> 
    </div>
    </>
  )
}

export default App;
