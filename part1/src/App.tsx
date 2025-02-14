import { useEffect, useState } from "react"
// import Course, { courses, iCourses } from "./compoents/Course"
import { Filter, PersonForm, Persons } from "./compoents/Phonebook"
import personsService, { iPerson } from './services/persons.tsx'

const App = () => {
  const [persons, setPersons] = useState<iPerson[]>([]);
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Com useEffect o seguinte código só se chama umha vez
  useEffect(() => {
    personsService.getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.log('fail', error)
      });
  }, []); // [] fequencia coa se ejecuta o efecto, [] = só co primeiro renderizado

  const handleAddPhone = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = (event.target as HTMLFormElement);
    const inputName = form.querySelector("input[id='nome']") as HTMLInputElement;
    const inputNumber = form.querySelector("input[id='numero']") as HTMLInputElement;
    const inputNameValue = inputName.value;
    const inputNumerValue = inputNumber.value;
    if (inputNameValue.length > 0) {
      if (persons.findIndex(person => person.name === inputNameValue) > -1) {
        alert(`${inputNameValue} is already added to phonebook`)
      } else {
        personsService.create({id: persons.length, name: inputNameValue, number: inputNumerValue})
          .then(response => {
            setPersons(persons.concat({id: persons.length, name: response.data.name, number: response.data.number}))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const handleFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    setNewFilter(inputValue)
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
        <Filter value={newFilter} onFilterChange={handleFilterChange} />
        <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} 
          onAddPhone={handleAddPhone} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons persons={persons} newFilter={newFilter} />
      </div>
    </>
  );
}

export default App