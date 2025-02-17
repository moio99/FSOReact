import { iCountry } from "../services/countries";
import { iFilterInputProps } from "./Phonebook"

interface CountryListProps {
  filteredCountries: iCountry[];
  allCountriesLength: number;
  onShowCountry: (id: string) => void;
}

export const Filter = ({value, onFilterChange}: iFilterInputProps) => {
  return (
    <div>
      find countries: <input id='filtro' value={value} onChange={onFilterChange}/>
    </div>
  )
}

export const ShowCountries = ({ filteredCountries, allCountriesLength, onShowCountry }: CountryListProps) => {
  if (filteredCountries.length > 10) {
    return (
      <>
        {filteredCountries.length === allCountriesLength ? (
          <p>All countries: {filteredCountries.length}</p>
        ) : (
          <p>Too many matches, specify another filter</p>
        )}
      </>
    );
  }

  if (filteredCountries.length > 1) {
    return (
      <>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common} <button onClick={() => onShowCountry(country.name.common)}>Show</button>
          </div>
        ))}
      </>
    );
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];

    return (
      <div key={country.fifa}>
        <h3>{country.name.common}</h3>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h4>Languages:</h4>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
      </div>
    );
  }

  return <p>{filteredCountries.length}</p>;
};