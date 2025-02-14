import { useEffect, useState } from "react"
// import Course, { courses, iCourses } from "./compoents/Course"
import { Filter, iPerson, NotificationInfo, PersonForm, Persons } from "./compoents/Phonebook"
import personsService from './services/persons.tsx'

const App = () => {
  const [persons, setPersons] = useState<iPerson[]>([]);
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [actionInfo, setActionInfo] = useState('')

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
      const person = persons.find(person => person.name === inputNameValue)
      if (person) {
        updatePerson(person, inputNameValue, inputNumerValue)
      } else {
        addPerson(inputNameValue, inputNumerValue)
      }
    }
  }

  const updatePerson = (person: iPerson, newName: string, newNumber: string) => { 
    const confirmText = `The name "${person.name}" is already added to the phonebook, replace the old number "${person.number}" with this "${newNumber}"?` 
    if (window.confirm(confirmText)) {
      const updatePerson = {id: person.id, name: newName, number: newNumber}
      personsService.update(person.id, updatePerson)
        .then(response => {
          console.log('update', response.data)
          setPersons(persons.map(p => (p.id === person.id ? updatePerson : p)));
          setNewName('')
          setNewNumber('')
          showInfo(`Updated name: "${response.data.name}", number: "${response.data.number}"`)
        })
    }
   }

   const addPerson = (newName: string, newNumber: string) => { 
    const newPerson = {id: persons.length.toString(), name: newName, number: newNumber}
    personsService.create(newPerson)
      .then(response => {
        console.log('create', response.data)
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        showInfo(`Added name: "${response.data.name}", number: "${response.data.number}"`)
      })
    }

  const showInfo = (info: string) => { 
    setActionInfo(info)
    setTimeout(() => {
      setActionInfo('')
    }, 5000)
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

  const onDelete = (id: string) => {
    const person = persons.find(person => person.id === id)
    if (person) {
      if (window.confirm(`Delete ${person.name}`)) {
        personsService.deleteById(id)
          .then(response => {
            console.log('delete', response)
            const newPersons = persons.filter(p => p.id !== id)
            setPersons(newPersons)
          })
      }
    }
  };
  
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
        <NotificationInfo message={actionInfo} />
        <Filter value={newFilter} onFilterChange={handleFilterChange} />
        <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} 
          onAddPhone={handleAddPhone} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons persons={persons} newFilter={newFilter} onDelete={onDelete} />
      </div>
    </>
  );
}

export default App