import Course from "./compoents/Course"

interface iCourses {
  name: string;
  id: number;
  parts: {
      name: string;
      exercises: number;
      id: number;
  }[];
}

const App = () => {
  const courses = [
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
  
  return (
    <>
      <h2>Web development curriculum</h2>
      {courses.map( (course: iCourses) => 
        <div key={course.id}>
          <Course name={course.name} parts={course.parts} />
        </div>
      )}
    </>
  )
}

export default App