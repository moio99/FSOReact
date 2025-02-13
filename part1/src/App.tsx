import { useState } from "react"
// import Course, { courses, iCourses } from "./compoents/Course"

const App = () => {
  const [persons, setPersons] = useState([{ id:0, name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const addPhone = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = (event.target as HTMLFormElement);
    const inputElement = form.querySelector("input[id='nome']") as HTMLInputElement;
    const inputValue = inputElement.value;

    setPersons(persons.concat({id: persons.length, name: inputValue}))
    setNewName('')
  }

  const handleNoteChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    setNewName(inputValue)
  }
  
  return (
    <>
      {/* <h2>Web development curriculum</h2>
      {courses.map((course: iCourses) => (
        <div key={course.id}>
          <Course name={course.name} parts={course.parts} />
        </div>
      ))} */}

      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPhone}>
          <div>
            name: <input id='nome' value={newName} onChange={handleNoteChange}/>
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
          {persons.map( (person: {id: number, name: string}) => 
            <div key={person.id}>{person.name}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App