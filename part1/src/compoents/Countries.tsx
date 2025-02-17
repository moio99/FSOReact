import { iFilterInputProps } from "./Phonebook"

export const Filter = ({value, onFilterChange}: iFilterInputProps) => {
  return (
    <div>
      find countries: <input id='filtro' value={value} onChange={onFilterChange}/>
    </div>
  )
}