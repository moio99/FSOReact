import axios from 'axios'
import { iPerson } from '../compoents/Phonebook'

const getBaseURL = () => {
  const url = '/api/persons'
  const devUrl = 'http://localhost:3000'
  const mode = import.meta.env.MODE
  if (mode === 'development') {
    return devUrl + url
  }
  return url  
}

const getAll = () => {
  const request = axios.get(getBaseURL())
  return request.then(response => {
    return response.data
  })
  // ou só o seguinte
  // return axios.get<iPerson[]>(getBaseURL())
}

const create = (person: iPerson) => {
  return axios.post<iPerson>(getBaseURL(), person)
}

const update = (id: string, person: iPerson) => {
  return axios.put(`${getBaseURL()}/${id}`, person)
}

const deleteById = (id: string) => {
  return axios.delete(`${getBaseURL()}/${id}`)
}

export default {
  getAll,
  create,
  update,
  deleteById,
}
