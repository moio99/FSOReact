import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
    setValue
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!name) return

    const fetchCountry = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        setCountry(response.data)
      } catch (error) {
        setError('Country not found')
        setCountry(null)
      }

      setLoading(false)
    }

    fetchCountry()
  }, [name]) // Ejecúta-se quando `name` muda

  return { country, loading, error }
}