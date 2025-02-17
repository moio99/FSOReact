import { useEffect, useState } from "react"
// import Course, { courses, iCourses } from "./compoents/Course"
import { Filter, iNotification, iPerson, NotificationInfo, PersonForm, Persons } from "./compoents/Phonebook"
import personsService from './services/persons.tsx'
import countriesService, { iCountry } from "./services/countries.tsx";

const App = () => {
  const [persons, setPersons] = useState<iPerson[]>([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [actionInfo, setActionInfo] = useState<iNotification>({text: '', error: false})
  const [countriesFilter, setCountriesFilter] = useState('')
  const [allCountries, setAllCountries] = useState<iCountry[]>([])
  const [filteredCountries, setFilteredCountries] = useState<iCountry[]>([])

  let firstGetAll = false

  // Com useEffect o seguinte código só se chama umha vez
  useEffect(() => {
    personsService.getAll()
      .then(response => {
        console.log('getall', 'ok')
        setPersons(response.data);
      })
      .catch(error => {
        console.log('fail personsService.getAll', error)
      })

    if (!firstGetAll) {
      firstGetAll = true
      countriesService.getAll()
        .then(countries => {          
          setAllCountries(countries)
          setFilteredCountries(countries)
          console.log(countries)
        })
        .catch(error => {
          console.log('fail countriesService.getAll', error)
        })
    }
  }, []) // [] fequencia coa se ejecuta o efecto, [] = só co primeiro renderizado

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
        .catch(() => { showInfo(`Error on create "${newName}"`, true) })
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
      .catch(() => { showInfo(`Error on create "${newName}"`, true) })
  }

  const deletePerson = (id: string) => {
    const person = persons.find(person => person.id === id)
    if (person) {
      if (window.confirm(`Delete ${person.name}`)) {
        personsService.deleteById(id)
          .then(response => {
            console.log('delete', response)
            const newPersons = persons.filter(p => p.id !== id)
            setPersons(newPersons)
            showInfo(`Deleted name: "${response.data.name}", number: "${response.data.number}"`)
          })
          .catch(error => {
            console.log('delete', error)
            if (error.status === 404) {
              showInfo(`Information of "${person.name}" has laready deleted from server`, true)
            }
            else {
              showInfo(`Error on delete "${person.name}"`, true)
            }
          })
      }
    }
  }

  const showInfo = (info: string, error?: boolean) => {
    const newActionInfo = { text: info, error: error ? true : false  }
    setActionInfo(newActionInfo)
    setTimeout(() => {
      setActionInfo({text: '', error: false})
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
  
  const handleCountriesFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    setCountriesFilter(inputValue)
    const filteredCountries = allCountries.filter(c => c.name.common.toLowerCase().includes(inputValue.toLowerCase()))
    setFilteredCountries(filteredCountries);
  }
  
  return (
    <>
      {/* <h2>Web development curriculum</h2>
      {courses.map((course: iCourses) => (
        <div key={course.id}>
          <Course name={course.name} parts={course.parts} />
        </div>
      ))} 
      <hr />*/}

      <div>
        <h2>Countries</h2>
        <Filter value={countriesFilter} onFilterChange={handleCountriesFilterChange} />
        {filteredCountries.length > 10 ? (
          <>
            {filteredCountries.length === allCountries.length ? (
              <p>All countries: {filteredCountries.length}</p>
            ) : 
            <p>Too many matches, specify another filter</p>}
          </>
        ) : (
          <>
            {filteredCountries.length > 1 ? (
              <>
                {filteredCountries.map( (country: iCountry) => 
                  <div key={country.name.common}>{country.name.common}</div>
                )}
              </>
            ) : 
              <>
                {filteredCountries.length > 0 && filteredCountries.length < 2 ? (
                  <div key={filteredCountries[0].fifa}>
                    <h3>{filteredCountries[0].name.common}</h3>
                    <div>Capital: {filteredCountries[0].capital}</div>
                    <div>Area: {filteredCountries[0].area}</div>
                    <h4>Sanguagues:</h4>
                    <ul>
                      {Object.entries(filteredCountries[0].languages).map(([key, value]) => (
                        <li key={key}>{value}</li>
                      ))}
                    </ul>
                    <img src={filteredCountries[0].flags.png} alt={filteredCountries[0].name.common} />
                  </div>
                ) : 
                <p>{filteredCountries.length}</p>}
              </>
            }
          </>
        )}
      </div>

      <hr />
      <div>
        <h2>Phonebook</h2>
        <NotificationInfo values={actionInfo} />
        <Filter value={newFilter} onFilterChange={handleFilterChange} />
        <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} 
          onAddPhone={handleAddPhone} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons persons={persons} newFilter={newFilter} onDelete={deletePerson} />
      </div>
    </>
  );
}

export default App