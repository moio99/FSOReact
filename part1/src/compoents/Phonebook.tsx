
interface iFilterInputProps {
  value: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface iPersonFormProps {
  newName: string;
  newNumber: string;
  onAddPhone: (event: React.FormEvent<HTMLFormElement>) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface iPerson {
  id: string;
  name: string;
  number: string;
}

interface iPersonsProps {
  persons: iPerson[];
  newFilter: string;
  onDelete: (id: string) => void;
}

const notificationStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16,
  background: 'lightgrey',
  padding: '10px',
  borderStyle: 'solid',
  borderRadius: '5px',
  marginBottom: '10px'
}

export const NotificationInfo = (value: {message: string}) => {
  if (value.message !== '') {
    return (
      <div style={notificationStyle}>
        {value.message}
      </div>
    )
  }
}

export const Filter = ({value, onFilterChange}: iFilterInputProps) => {
  return (
    <div>
      filter shown with: <input id='filtro' value={value} onChange={onFilterChange}/>
    </div>
  )
}

export const PersonForm = ({newName, newNumber, onAddPhone, onNameChange, onNumberChange}: iPersonFormProps) => {
  return (
    <form onSubmit={onAddPhone}>
      <div>
        name: <input id='nome' value={newName} onChange={onNameChange}/>
      </div>
      <div>
        number: <input id='numero' value={newNumber} onChange={onNumberChange}/>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export const Persons = ({persons, newFilter, onDelete}: iPersonsProps) => {
  return (
    <div>
      {persons.map( (person: iPerson) => {
          if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
            return ( 
              <div key={person.id}>
                {person.name} {person.number} <button onClick={() => onDelete(person.id)}>delete</button>
              </div>
            )
          }
        }
      )}
    </div>
  )
}