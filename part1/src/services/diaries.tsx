import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from '../types'

const getBaseURL = () => {
  const url = '/api/diaries'
  const devUrl = 'http://localhost:3000'
  return devUrl + url 
}

const getAll = () => {
  const request = axios.get<DiaryEntry[]>(getBaseURL())
  return request.then(response => {
    return response.data
  })
  // ou só o seguinte
  // return axios.get<DiaryEntry[]>(getBaseURL())
}

const create = (diary: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(getBaseURL(), diary).then(response => response.data)
}

const update = (id: string, diary: DiaryEntry) => {
  return axios.put(`${getBaseURL()}/${id}`, diary)
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