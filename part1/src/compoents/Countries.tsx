import { iCountry } from "../services/countries";
import { iFilterInputProps } from "./Phonebook"

interface CountryListProps {
  filteredCountries: iCountry[];
  allCountriesLength: number;
  onShowCountry: (id: string) => void;
}

export interface iWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // Opcional
    grnd_level?: number; // Opcional
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number; // Opcional
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number; // Opcional
    id?: number; // Opcional
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
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

export const ShowWeather = (data: { value: iWeather | undefined }) => {
  if (data.value) {
    return (
      <div>
        <h2>Weather in {data.value.name}</h2>
        <div>Temperature: {data.value.main.temp} Celsius</div>
        <div><img src={`https://openweathermap.org/img/wn/${data.value.weather[0].icon}@2x.png`} alt="" /></div>
        <div>Wind: {data.value.wind.speed} m/s</div>
      </div>
    )
  }
}