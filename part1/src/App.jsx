import React, { useState } from 'react'
import  { useField, useCountry } from './hooks'
import './index.css'

const Country = ({ data, loading, error }) => {
  if (loading) { return <div>Loading...</div> }
  if (error) { return <div>{error}</div> }

  if (!data || !data.country || !data.country?.name) {
    return <div>Not found...</div>
  } else {
    return (
      <div>
        {<>
          <h3>{data.country.name.common} </h3>
          <div>capital {data.country.capital[0]} </div>
          <div>population {data.country.population}</div> 
          <img src={data.country.flags.png} height='100' alt={data.country.flags.alt}/>  
        </>}
      </div>
    )
  }
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)  // Estabelece o nome do pais a procurar
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country data={country} />
    </div>
  )
}

export default App