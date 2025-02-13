import { useState } from "react"
// import Course, { courses, iCourses } from "./compoents/Course"

const App = () => {
  const [persons, setPersons] = useState([{ id:0, name: 'Arto Hellas', number: '123 456 789' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPhone = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = (event.target as HTMLFormElement);
    const inputName = form.querySelector("input[id='nome']") as HTMLInputElement;
    const inputNumber = form.querySelector("input[id='numero']") as HTMLInputElement;
    const inputNameValue = inputName.value;
    const inputNumerValue = inputNumber.value;

    if (persons.findIndex(person => person.name === inputNameValue) > -1) {
      alert(`${inputNameValue} is already added to phonebook`)
    } else {
      setPersons(persons.concat({id: persons.length, name: inputNameValue, number: inputNumerValue}))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    setNewName(inputValue)
  }
  const handleNumberChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    setNewNumber(inputValue)
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
            name: <input id='nome' value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            number: <input id='numero' value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
          {persons.map( (person: {id: number, name: string, number: string}) => 
            <div key={person.id}>{person.name} {person.number}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App